import './sources.css';

export interface Source {
    name: string;
    id?: string;
}

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

                const sourceItemName = sourceClone.querySelector('.source__item-name');
                if (sourceItemName) {
                    sourceItemName.textContent = item.name;
                }

                const sourceItem = sourceClone.querySelector('.source__item');
                if (sourceItem && item.id !== undefined) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }
                fragment.append(sourceClone);
            });
            const sourcesContainer = document.querySelector('.sources');
            if (sourcesContainer) {
                sourcesContainer.append(fragment);
            }
        }
    }
}

export default Sources;
