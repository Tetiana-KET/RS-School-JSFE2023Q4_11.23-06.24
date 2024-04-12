import { isHTMLElementTag, isInstanceOf, isSome } from '../utils/commonUtils';
import type { ConstructorOf, Nullable } from '../utils/types';

export type HTMLElementTag = keyof HTMLElementTagNameMap;
export type HTMLElementInstance = HTMLElementTagNameMap[HTMLElementTag];

export type ComponentCreateOptions<Tag extends HTMLElementTag> = {
  className?: string;
  text?: string;
  id?: string;
  element?: HTMLElementTagNameMap[Tag];
  children?: Component<Tag>[];
  attributes?: { [key: string]: string | boolean };
};

const elementToComponentMap: WeakMap<HTMLElementTagNameMap[HTMLElementTag] | ChildNode, Component<HTMLElementTag>> = new WeakMap();

export class Component<Tag extends HTMLElementTag> {
  public static setStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
    Object.assign(element.style, { ...styles });
  }

  public static findComponentOf<C extends Component<HTMLElementTag>>(element: ChildNode): C | undefined {
    const c = elementToComponentMap.get(element);
    if (isSome<C>(c)) {
      return c;
    }
    return undefined;
  }

  protected readonly nodeElement: HTMLElementTagNameMap[Tag];

  private resizeObserver: Nullable<ResizeObserver>;

  constructor(entity: Tag | HTMLElementTagNameMap[Tag], options?: ComponentCreateOptions<Tag>) {
    const { className = '', text = '', id = undefined, children = [] } = options ?? {};

    if (!isHTMLElementTag<Tag>(entity) && isSome<HTMLElementInstance>(entity) && Component.findComponentOf(entity)) {
      throw new Error(`Component of ${String(entity)} already exists`);
    }
    const node = isHTMLElementTag<Tag>(entity) ? document.createElement<Tag>(entity) : entity;

    if (id) {
      node.id = id;
    }

    if (children) {
      this.appendChildren(children);
    }

    node.className = className;
    node.textContent = text;
    this.nodeElement = node;

    elementToComponentMap.set(this.nodeElement, this);
  }

  // Append a child
  public appendChild<Child extends Component<HTMLElementTag>>(child: Child): Child {
    this.nodeElement.appendChild(child.nodeElement);
    return child;
  }

  // Append an array of children
  public appendChildren(children: Array<Component<HTMLElementTag>>): typeof this {
    children.forEach(c => {
      this.appendChild(c);
    });
    return this;
  }

  public get element(): HTMLElementTagNameMap[Tag] {
    return this.nodeElement;
  }

  // Returns a child component per provided index.
  public getChildAt(index: number): Component<HTMLElementTag> | undefined {
    return this.getChildren()[index];
  }

  // Returns an array of child components.
  public getChildren(): Array<Component<HTMLElementTag>>;
  public getChildren<Child extends Component<HTMLElementTag>>(childType: ConstructorOf<Child>): Array<Child>;
  public getChildren<Child extends Component<HTMLElementTag>>(childType?: ConstructorOf<Child>): Component<HTMLElementTag>[] {
    const children = Array.from(this.nodeElement.childNodes)
      .map(elem => Component.findComponentOf(elem))
      .filter((child): child is Component<HTMLElementTag> => isSome(child));

    if (isSome(childType)) {
      return children.filter(child => isInstanceOf(childType, child));
    }
    return children;
  }

  // Returns length of the children.
  public get childrenCount(): number {
    return this.nodeElement.childNodes.length;
  }

  // Sets the text content
  public setTextContent(content: string): typeof this {
    this.nodeElement.textContent = content;
    return this;
  }

  // Sets an attribute on the component's HTML node.
  public setAttribute(attribute: string, value: string): typeof this {
    this.nodeElement.setAttribute(attribute, value);
    return this;
  }

  // Removes an attribute
  public removeAttribute(attribute: string): void {
    this.nodeElement.removeAttribute(attribute);
  }

  // toggle class
  public toggleClass(className: string, force?: boolean): typeof this {
    if (className) {
      this.nodeElement.classList.toggle(className, force);
    }
    return this;
  }

  public observe(onResize: (entry: ResizeObserverEntry) => void): typeof this {
    this.unobserve();
    this.resizeObserver = new ResizeObserver(entries => onResize(entries[0]));
    this.resizeObserver.observe(this.nodeElement);
    return this;
  }

  public unobserve(): typeof this {
    if (isSome(this.resizeObserver)) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    return this;
  }

  // Destroy the current component and removes its HTML node from the DOM.
  public destroy(): void {
    this.unobserve();
    this.destroyChildren();
    this.nodeElement.remove();
  }

  // Destroys all child
  public destroyChildren(): void {
    this.getChildren().forEach(child => {
      child.destroy();
    });
  }
}
