$(document).ready(function() {

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
    $(this).closest('.column-card').hide("explode", 1000).remove();
  });

  $('.oi-plus').on('click', function () {

    let column = $(this).closest('.column');    
    column.append('<form><input name="task" class="input" placeholder="Task"/><input class="input" name="assignee" placeholder="Assignee"/> <input name="date" class="input" placeholder="Date"/>  <button id="createTask" class="btn" type="submit">Create</button></form>');
    column.find('input[name="date"]').datepicker();
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

    column.append(card);
    
    $(this).closest('form').remove();
    enableCardSorting();
  });


});