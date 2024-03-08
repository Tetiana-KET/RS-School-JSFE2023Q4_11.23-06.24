export interface BaseComponentParameters {
  tagName: keyof HTMLElementTagNameMap;
  text?: string;
  classNames?: string[];
  children?: Component[];
  attributes?: { [key: string]: string | boolean };
}

export class Component<T extends HTMLElement = HTMLElement> {
  protected node: T;
  protected children: Component[] = [];

  constructor({
    tagName = 'div',
    text = '',
    classNames = [],
    children = [],
    attributes = {},
  }: BaseComponentParameters) {
    const node = document.createElement(tagName) as T;

    if (classNames.length) {
      node.classList.add(...classNames);
    }

    if (Object.keys(attributes).length) {
      for (let [key, value] of Object.entries(attributes)) {
        if (typeof value === 'boolean') {
          if (value) {
            node.setAttribute(key, '');
          } else {
            node.removeAttribute(key);
          }
        } else {
          node.setAttribute(key, value);
        }
      }
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

  public prepend(child: Component): void {
    if (child instanceof Component) {
      this.children.push(child);
      this.node.prepend(child.getNode());
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
