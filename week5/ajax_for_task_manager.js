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
    $('#newCategoryButton').on('submit', function (e) {
        event.preventDefault();
        var ncb = $(this);
        $.ajax('http://localhost:3000/categories', {
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                form.remove();
            }
        })
    });
};

$(function() {
    $.when(
        categories.fetchCategories(),
        tasks.fetchTasks(),
        makeNewCategory()
    ).then(function (categoryResult, taskResult) {
        console.log(categoryResult);
        categoryResult[0].forEach(function (category) {
            console.log(category);
            $('.categories').append('<li>'+category.name+'<ul data-category-id="'+category.id+'"></ul></li>');
            $('#categoryList').append('<option>'+category.name+'</option>');
        });

        taskResult[0].forEach(function(task) {
            $('ul[data-category-id="'+task.category+'"]').append('<li>'+task.name+'</li>');
        });
    });
});