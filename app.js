$(document).ready(function() {

  function enableColumnSorting() {
    $('.columns').sortable({
    receive: function( event, ui ) {},
    cursor: "move",
    connectWith: ".columns",
    handle: ".column-heading",
    helper: "clone",
    placeholder: "ui-sortable-placeholder",
    opacity: 0.5,
    items: ".column"
   
  });
  }
  enableColumnSorting();

  function enableCardSorting() {
    $('.column').sortable({
    receive: function( event, ui ) {},
    cursor: "move",
    connectWith: ".column",
    handle: ".task",
    helper: "clone",
    placeholder: "ui-sortable-placeholder",
    opacity: 0.5,
    items: ".column-card"
   
  });
  }
  enableCardSorting();

  $('.column-creation').on('click','h2', function() {

    let form = `
      <form>
        <input name="column" class="form-control" placeholder="name"/>  
        <button id="createColumn" class="btn" type="submit">Create</button>
      </form>`;

    $(this).closest('.column-creation').append(form);
    $(this).remove();
  });

  $('.column-creation').on('click','#createColumn', function (e) {
    e.preventDefault();
    let section = $(this).closest('.column-creation');
    let columnName = section.find('input[name="column"]').val();
    let column =`
      <div>
        <section class="card column">
            <div class="column-icons">
                <span class="oi oi-trash" name="trash" aria-hidden="true"></span>
                <span class="oi oi-plus" name="plus" aria-hidden="true"></span>
            </div>
          <h2 class="column-heading ui-sortable-handle">${columnName}</h2>
        </section>
      </div>`;
      
    $('body').find('.columns').append(column);
    section.append('<h2>Create more columns?</h2>');
    section.find('form').remove();
  });

  $('.column').on('click','.column-card h3' ,function() {
    let cardContent = $(this).closest('.column-card').find('.content');
    cardContent.show();
    cardContent.tabs();
    cardContent.dialog({minWidth: 350, close: function(event, ui) {
      cardContent.tabs("destroy");
      cardContent.dialog("destroy");
      cardContent.hide();
    }});

  });

  $('body').on('click', '.ui-dialog h4', function () {
    $(this).next().toggle();
  });

  $('body').on('click', '.oi-trash', function () {
    if($(this).closest('.column-card').length) {
      $(this).closest('.column-card').hide("explode", 1000).remove();
    } else {
      $(this).closest('.column').hide("explode", 1000).remove();
    }
    
  });

  $('.columns').on('click', '.oi-plus', function () {
    
    let column = $(this).closest('.column');

    if (!column.find("form").length)  {

      let form = `
      <form>
        <input name="task" class="form-control" placeholder="Task"/>
        <input class="form-control" name="assignee" placeholder="Assignee"/>
        <input name="date" class="form-control" placeholder="Date"/>
        <button id="createTask" class="btn" type="submit">Create</button>
      </form>`;

      column.append(form);
      column.find('form').hide();
    }
    
    column.find('form').show({ effect: "scale", direction: "horizontal" });
    column.find('input[name="date"]').datepicker();

    $(this).removeClass('oi-plus').addClass('oi-minus');


  });

  
  $('.columns').on('click', '.oi-minus', function () {
    
    let column = $(this).closest('.column'); 
    
    column.find('form').hide({ effect: "scale", direction: "horizontal" });

    $(this).removeClass('oi-minus').addClass('oi-plus');
  });

  $('body').on('click', "#createTask" ,function(e) {
    e.preventDefault();
    let task = $(this).siblings('input[name="task"]').val();
    let assignee = $(this).siblings('input[name="assignee"]').val();  
    let date = $(this).siblings('input[name="date"]').val();  
    let column = $(this).closest('.column');
    let card = `
    <div class="column-card card ui-sortable">
      <span class="oi oi-trash"></span>
      <div class="task ui-sortable-handle">    
        <h3>${task}</h3>
      </div>
      <div class="hidden content">
        <ul class="nav nav-pills mb-3">
          <li class="nav-item"><a class="nav-link active" href="#description">Description</a></li>
          <li class="nav-item"><a class="nav-link" href="#assignee">Assignee</a></li>
          <li class="nav-item"><a class="nav-link" href="#deadline">Deadline</a></li>
        </ul>
        <div id="description">
            <h4>Description</h4>
            <p class="hidden">${task}</p>
        </div>
        <div id="assignee">
            <h4>Assignee</h4>
            <p class="hidden">${assignee}</p>
        </div>
        <div id="deadline">
            <h4>Deadline</h4> 
            <p class="hidden">${date}</p>
        </div>
      </div>`;

    column.append(card).show({ effect: "scale"});
    
    $(this).closest('form').remove();
    enableCardSorting();
 
    column.find('.oi-minus').removeClass('oi-minus').addClass('oi-plus');
  });


});