var classList = [
        { name: "Java 101", category: "PROG", dateCreated: "1/1/2015", description: "Wow" },
        { name: "MongoDB 101", category: "DB", dateCreated: "2/1/2015", description: "Good" },
        { name: "Express 101", category: "PROG", dateCreated: "3/1/2015", description: "Better" },
        { name: "AngularJS 101", category: "WEB", dateCreated: "4/1/2015", description: "Best" },
        { name: "NodeJS 101", category: "PROG", dateCreated: "5/1/2015", description: "Awesome" }
]


var template;

$(function () {
    template = $(".template");

    renderClassList(classList);
    $("#classList").on("click", ".delete", removeClass);
    $("#classList").on("click", ".edit", editClass);
    $("#datepicker").datepicker();
    $("#datepicker").datepicker('setDate', new Date());
    $("#addClass").click(addClass);
});

function renderClassList(classList) {
    var container = $("#classList");
    container.empty();

    for (var i = 0; i < classList.length; i++) {
        var currentClass = classList[i];
        var cloned = template.clone();

        cloned.find(".name").html(currentClass.name);
        cloned.find(".category").html(currentClass.category);
        cloned.find(".date").html(currentClass.dateCreated);
        cloned.find(".delete").attr("id", i);
        cloned.find(".edit").attr("id", i);

        container.append(cloned);
    }
}

function removeClass(event) {
    event.preventDefault();

    $('#confirm').modal('show')
       .one('click', '#confirmremove', function (e) {

           var button = $(event.currentTarget);
           var id = button.attr('id');
           classList.splice(id, 1);
           renderClassList(classList);
       });
}

function addClass() {
    clearAddClassModal();
    event.preventDefault();

    var day = new Date();
    today = $.datepicker.formatDate("mm/dd/yy", day);
    $("input#datepicker").val(today);

    $("#addCourse").modal("show").one('click', '#okClass', function (e) {

        var name = $("input#name").val();
        var category = $("select#category").val();
        var date = $("input#datepicker").val();
        var description = $("textarea#description").val();

        var newClass = {
            name: name,
            category: category,
            dateCreated: date,
            description: description
        };

        classList.push(newClass);
        renderClassList(classList);
    });
}


function editClass(event) {
    var button = $(event.currentTarget);
    var id = button.attr('id');

    $("input#name").val(classList[id].name);
    $("select#category").val(classList[id].category);
    $("input#datepicker").val(classList[id].dateCreated);
    $("textarea#description").val(classList[id].description);

    $("#addCourse").modal("show").one('click', '#okClass', function (e) {
        var name = $("input#name").val();
        var category = $("select#category").val();
        var dateCreated = $("input#datepicker").val();
        var description = $("textarea#description").val();

        classList[id].name = name;
        classList[id].category = category;
        classList[id].dateCreated = dateCreated;
        classList[id].description = description;

        renderClassList(classList);
    });
}

function clearAddClassModal() {
    $("input#name").val("");
    $("select#category").val("");
    $("input#datepicker").val("");
    $("textarea#description").val("");
}