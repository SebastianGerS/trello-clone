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
    $(this).closest('.column-card').find('.content').toggle();
  });

  $('.column').on('click', '.column-card h4', function () {
    $(this).next().toggle();
  });

  $('.oi-plus').on('click', function () {
    
    $(this).closest('.column').append('<form><input name="task" class="input" placeholder="Task"/> <input class="input" name="assignee" placeholder="Assignee"/> <button id="createTask" class="btn" type="submit">Create</button></form>');

  });

  $('.column').on('click', "#createTask" ,function(e) {
    e.preventDefault();
    let task = $(this).siblings('input[name="task"]').val();
    let assignee = $(this).siblings('input[name="assignee"]').val();  
    let column = $(this).closest('.column');
    let card = `<div class='card column-card ui-sortable'><div class="task ui-sortable-handle"><h3>${task}</h3></div><div class='hidden content'><div class='main-content'><h4>Description</h4><p class='hidden'>${task}</p></div><div class='asigned'><h4>Assignee</h4><p class='hidden'>${assignee}</p></div><div class='deadline'><h4>Deadline</h4><p class='hidden'>This card has some deadline</p></div></div>`;
    column.append(card);
    $(this).closest('form').remove();
    enableCardSorting();
  });


});