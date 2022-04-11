export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId);

        if (!column) {
            return [];
        }

        return column.items;
    }

    // 아이템 넣기
    static insertItem(columnId, content) {
        const data = read();
        // 칼럼의 id로 그 칼럼의 데이터를 모두 가져온다 
        const column = data.find(column => column.id == columnId);

        // 랜덤으로 아이디값 생성 
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };

        if (!column) {
            throw new Error("Column does not exist.");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    // 아이템 위치 이동시 수정 
    static updateItem(itemId, newProps) {
        const data = read();
        console.log('itemid: ' + itemId);
        console.log('newProps' + newProps);
        const [item, currentColumn] = (() => {
            let item;
            for (const column of data) {
                item = column.items.find(item => item.id == itemId);

                if (item) {
                    return [item, column];
                }
            }
            if (!item) return [undefined, undefined];
        })();


        console.log('itemId: ' + itemId);
        console.log('newProps: ' + JSON.stringify(newProps));
        if (!item) {
            if (!currentColumn) return;
            throw new Error("Item not found.");

        }

        // 위치만 바꾸면 newProps.content가 undefined
        // 위치만 바뀌면 content는 그대로 / 내용이 바뀌면 content가 바뀜 
        item.content = newProps.content === undefined ? item.content : newProps.content;

        // Update column and position
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId);

            if (!targetColumn) {
                throw new Error("Target column not found.");
            }

            // splice() 메소드는 배열의 기존 요소를 삭제 또는 교체하거나
            // 새 요소를 추가하여 배열의 내용을 변경한다.
            // 이 메소드는 원본 배열 자체를 수정한다.

            // 현재 컬럼에서 삭제
            // Delete the item from it's current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // 새로운 컬럼에 추가 
            // Move item into it's new column and position
            targetColumn.items.splice(newProps.position, 0, item);
        }

        console.log(data)
        save(data);
    }

    static deleteItem(itemId) {
        const data = read();

        for (const column of data) {
            const item = column.items.find(item => item.id == itemId);

            // 현재 컬럼에 삭제 
            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }

        save(data);
    }
}

function read() {
    const json = localStorage.getItem("kanban-data");

    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ];
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}