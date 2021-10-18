import { ProjectInput } from "./utilities/form";

class ProjectList {
  hostEl: HTMLDivElement;
  templateEl: HTMLTemplateElement;
  element: HTMLElement;

  constructor(public type: string) {
    this.hostEl = document.querySelector("#app")! as HTMLDivElement;
    this.templateEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;

    this.selectDomElement();
    this.renderContent();
  }

  private selectDomElement() {
    const titleEl = document.querySelector("#title")! as HTMLInputElement;
    const peopleEl = document.querySelector("#people")! as HTMLInputElement;
    const submitButton = document.querySelector("#submit")! as HTMLInputElement;
    const descriptionEl = document.querySelector(
      "#description"
    )! as HTMLInputElement;

    submitButton.addEventListener("click", (e: Event) => {
      e.preventDefault();
      this.renderListItem(titleEl, descriptionEl, peopleEl);
    });
  }

  private renderContent() {
    const ul = this.element.querySelector("ul")!
    const h2 = this.element.querySelector("h2")!;
    ul.id = `${this.type}-projects-list`
    h2.textContent = `${this.type.toUpperCase()} PROJECTS`;
    this.hostEl.insertAdjacentElement("beforeend", this.element);
  }

  private renderListItem(
    titleEl: HTMLInputElement,
    descriptionEl: HTMLInputElement,
    peopleEl: HTMLInputElement
  ) {
    let ul = this.element.querySelector("ul")! as HTMLUListElement;
    const title:String = titleEl.value;
    const description: String = descriptionEl.value;
    const people: number = +peopleEl.value;
    ul.innerHTML += `<li>
      <h2>${title}</h2>
        <p>${description}</p>
        <h3>${people}</h3>
    </li>`;

    titleEl.value = "";
    descriptionEl.value = "";
    peopleEl.value = "";
  }
}

const prjInput = new ProjectInput();
const acitveProject = new ProjectList("active");
const deactiveProject = new ProjectList("deactive");
