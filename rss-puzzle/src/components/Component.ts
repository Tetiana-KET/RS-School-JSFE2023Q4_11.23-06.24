export interface BaseComponentParameters {
  tagName: keyof HTMLElementTagNameMap;
  text?: string;
  classNames?: string[];
  children?: Component[];
}

export class Component<T extends HTMLElement = HTMLElement> {
  protected node: T;
  protected children: Component[] = [];

  constructor({ tagName = 'div', text = '', classNames = [], children = [] }: BaseComponentParameters) {
    const node = document.createElement(tagName) as T;
    if (classNames.length > 0) {
      node.classList.add(...classNames);
    }
    node.textContent = text;
    this.node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  public appendChildren(children: Component[]): void {
    children.forEach(child => {
      this.append(child);
    });
  }

  public append(child: Component): void {
    if (child instanceof Component) {
      this.children.push(child);
      this.node.append(child.getNode());
    }
  }

  public getNode() {
    return this.node;
  }

  public getChildren() {
    return this.children;
  }

  public setTextContent(text: string): void {
    this.node.textContent = text;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public destroyChildren() {
    this.children.forEach(child => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy() {
    this.destroyChildren();
    this.node.remove();
  }
}
