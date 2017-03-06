/**
 * Created by markeldeiry on 1/18/17.
 */
var taskManager = {
    fetchCategories: function () {
        return $.getJSON('http://localhost:3000/categories.json')
    },

    fetchTasks: function () {
        return $.getJSON('http://localhost:3000/tasks.json')
    },

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
                    console.log(response);
                    $('.categories').append('<li>'+response.name+'<ul data-category-id="'+response.id+'"></ul></li>');
                    $('#categoryList').append('<option value="'+response.id+'">'+response.name+'</option>');
                    $('input[type=text], textarea').val('');
                }
            });
        });
    },

    mnt: function () {
        $('#newTaskForm').on('submit', function (e) {
            e.preventDefault();

            var params = {
                name: $('#inputTask').val(),
                category_id: $('#categoryList').val()
            };

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(params),
                url: "http://localhost:3000/tasks",
                success: function (response) {
                    $('ul[data-category-id='+response.category_id+']').append('<li data-task-id="'+response.id+'">'+response.name+'</li>');
                    $('input[type=text], textarea').val('');
                }
            })
        })
    },

    rct: function () {
        $('#removeCompleted').on('submit', function (e) {
            e.preventDefault();

            var completed = $('.completedTask').map(function() {
                return $(this).attr('data-task-id');
            });

            console.log(completed);

            $.makeArray(completed).forEach(function(id) {
                $.ajax({
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: "http://localhost:3000/tasks/"+id,
                    success: function () {
                        $('li[data-task-id='+id+']').remove();
                    }
                });
            });
        })
    },

    init: function() {
        $("ul.categories").on('click', 'li li', function (e) {
            e.preventDefault();
            $(e.target).toggleClass("completedTask");

            var id = $(e.target).data('task-id');
            var currentStatus = $(e.target).data('status');

            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                dataType: 'json',
                url: "http://localhost:3000/tasks/"+id,
                data: (currentStatus != 1) ? JSON.stringify({'status': 1}) : JSON.stringify ({'status': 0})
            });
            console.log('status = '+ currentStatus);
        });
        taskManager.rct();
        taskManager.mnc();
        taskManager.mnt();

        $.when(
            taskManager.fetchCategories(),
            taskManager.fetchTasks()
        ).then(function (categoryResult, taskResult) {
            console.log(categoryResult);
            categoryResult[0].forEach(function (category) {
                console.log(category);
                $('.categories').append('<li>'+category.name+'<ul data-category-id="'+category.id+'"></ul></li>');
                $('#categoryList').append('<option value="'+category.id+'">'+category.name+'</option>');
            });

            taskResult[0].forEach(function(task) {
                $('ul[data-category-id="'+task.category_id+'"]').append('<li data-task-id="'+task.id+'">'+task.name+'</li>');
            });
        });
    }
};

$(function() {
    taskManager.init();
});