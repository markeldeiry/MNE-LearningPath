/**
 * Created by markeldeiry on 1/18/17.
 */
var categories = {
    fetchCategories: function () {
        return $.getJSON('http://localhost:3000/categories')
    }
};

var tasks = {
    fetchTasks: function () {
        return $.getJSON('http://localhost:3000/tasks')
    }
};

var makeNewCategory = {
    mnc: function () {
        $('#newCategoryForm').on('submit', function (e) {
            e.preventDefault();

            var params = {
                name: $('#inputCategory').val()
            };

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(params),
                url: "http://localhost:3000/categories",
                success: function (response) {
                    console.log(categories);
                    $('.categories').append('<li>'+response.name+'<ul data-category-id="'+response.id+'"></ul></li>');
                    $('#categoryList').append('<option value="'+response.id+'">'+response.name+'</option>');
                    $('input[type=text], textarea').val('');
                }
            });
        });
    }

};

var makeNewTask = {
    mnt: function () {
        $('#newTaskForm').on('submit', function (e) {
            e.preventDefault();

            var params = {
                name: $('#inputTask').val(),
                category: $('#categoryList').val()
            };



            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(params),
                url: "http://localhost:3000/tasks",
                success: function (response) {
                    $('ul[data-category-id="'+response.category+'"]').append('<li>'+response.name+'</li>');
                    $('input[type=text], textarea').val('');
                }
            })
        })
    }
};

var markAsComplete = {
    mac: function () {
        $(document).on('click', function (e) {
            e.preventDefault();
            if (e.target.id === "isTask") {
                $(e.target).toggleClass("completedTask")
            }
        })
    }
};

// var removeCompletedTasks = {
//     rct: function () {
//         $('#removeCompleted').on('submit', function (e) {
//             e.preventDefault();
//             $('ul[data-category-id="'+task.category+'"] className=".completedTask"').remove('<li>'+task.name+'</li>');
//         })
//     }
// };

$(function() {
    // $(document).ready (function () {
    //     markAsComplete.mac()
    // });

    $.when(
        categories.fetchCategories(),
        tasks.fetchTasks(),
        makeNewCategory.mnc(),
        makeNewTask.mnt()
        // markAsComplete.mac()
        // removeCompletedTasks.rct()
    ).then(function (categoryResult, taskResult) {
        console.log(categoryResult);
        categoryResult[0].forEach(function (category) {
            console.log(category);
            $('.categories').append('<li>'+category.name+'<ul data-category-id="'+category.id+'"></ul></li>');
            $('#categoryList').append('<option value="'+category.id+'">'+category.name+'</option>');
        });

        taskResult[0].forEach(function(task) {
            $('ul[data-category-id="'+task.category+'"]').append('<li id="isTask">'+task.name+'</li>');
        });
    });
});