// import Kanban from "./view/Kanban.js";
//
//  new Kanban(
//  	document.querySelector(".kanban")
//  );

import KanbanAPI from "./api/KanbanAPI.js"



const makeItem = (columnId, itemId, content)=>{

    let root = $('<div>').attr({
        'class': 'kanban__item',
        'data-id': itemId,
        'draggable':'true'
    });
    let input = $('<div>').attr({
        'class': 'kanban__item-input',
        'contenteditable': 'true',
    });
    input.text(content);

    let dropzone = $('<div>').attr({
        'class': 'kanban__dropzone'
    });

    // add버튼 위에 추가
    $('[data-id="'+columnId+'"').find('.kanban__column-items').append(root.append(input).append(dropzone));


}

// 저장된 사항을 불러온다
const getList = ()=>{
    for(let i=1;i<=3;i++){
        KanbanAPI.getItems(i).forEach(item => {
            // console.log(item);
            // i번째 컬럼에 append
            let column = $('[data-id="'+i+'"');
            column.append(makeItem(i,item.id, item.content));
        });
    }
}
getList();

$('.kanban__add-item').on({
    'click':function (){

        let newItem = KanbanAPI.insertItem($(this).parent().attr('data-id') , "");

        makeItem($(this).parent().attr('data-id'), newItem.id, '');

    }

});
$('.kanban__item-input').on({
    'blur':function (){
        KanbanAPI.updateItem($(this).parent().attr('data-id'), {
            content: $(this).text()
        });
    }
})

$('.kanban__item').on({
    'dragstart':function (e){

        e.originalEvent.dataTransfer.setData('select_item_id',$(this).attr('data-id'));
        console.log('data-id: '+$(this).attr('data-id'))
    }

});

$('.kanban__dropzone').on({
    'dragover': function (e){
        e.preventDefault();
        $(this).addClass("kanban__dropzone--active");

    },
    'dragleave': function (e){
        $(this).removeClass("kanban__dropzone--active");
    },
    'drop': function(e){
        e.preventDefault();
        $(this).removeClass("kanban__dropzone--active");
        // console.log($(this));

        // 기존꺼 삭제하고 드랍존 아래에 넣는다
        // 1. 만약 처음에 추가됐을 경우 => 부모가 kanban__column-items일 때
        // 2. 부모가 kanban__item일 때
        // console.log($(this).parent().attr('class'));

        let select_item_id = e.originalEvent.dataTransfer.getData('select_item_id');
        let select_item = $('[data-id="'+select_item_id+'"');
        console.log('select_item_id: '+select_item_id);

        let new_column_id;
        let new_dropped_index;


        if($(this).parent().attr('class') == 'kanban__column-items'){
            // 드랍존 후에 추가

            $(this).after(select_item);
            new_column_id = $(this).parent().parent().attr('data-id');


        }
        else if($(this).parent().attr('class') == 'kanban__item'){
            // 드랍존의 부모에 추가


            $(this).parent().after(select_item);
            new_column_id = $(this).parent().parent().parent().attr('data-id');

        }


        let dropped_index = $('[data-id="'+new_column_id+'"').find('.kanban__dropzone').index(this);

        KanbanAPI.updateItem(select_item_id, {
            columnId: new_column_id,
            position: dropped_index
        });

    }

});



// 수정한 사항을 저장한다
const updateItem= (itemId, newColumnId, droppedIndex)=>{
    KanbanAPI.updateItem(itemId, {
        newColumnId,
        position: droppedIndex
    });
}








