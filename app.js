$(document).ready(function() {

  $.widget("misc.enableSorting", {

    options: {
      cursor: "move",
      target: null,
      handle: null,
      helper: "clone",
      placeholder: "ui-sortable-placeholder",
      opacity: 0.5,
      sortbale: null
    },

    _create: function (){
     
    },

    _setOption: function (key ,value) {
      this.options[key] = value;
    },

    _update: function (){
      
    },

    _destroy: function (target) {
      $(target).sortable('destroy');
    },

    makeSortable: function (target, handle, sortable) {
      
      let self = this;
      
      this._setOption("target", target);
      this._setOption("handle", handle);
      this._setOption("sortable", sortable);
      

      $(target).sortable({
        cursor: self.options.cursor,
        connectWith: self.options.target,
        handle: self.options.handle,
        helper: self.options.helper,
        placeholder: self.options.placeholder,
        opacity: self.options.opacity,
        items: self.options.sortable,
      });
        
    } // sets the options with data providede when function is caled and creates a new sortable whith thoes options.

  });

  $('.columns').enableSorting();
  $('.columns').enableSorting("makeSortable",'.columns', '.column-handle', '.column');
  $('.column').enableSorting();
  $('.column').enableSorting("makeSortable",'.column', '.ui-sortable-handle', '.column-card');
  //--initialising the widget and using the make sortable method to create sortables --

  $('.column-creation').on('click','h2', function() {

    let form = `
      <form>
        <input name="column" class="form-control" placeholder="name"/>  
        <button id="createColumn" class="btn" type="submit">Create</button>
      </form>`;

    $(this).closest('.column-creation').append(form);
    $(this).remove();

  }); //setts on click listener that apends a form and removes the clicked heading when clicked

  $('.column-creation').on('click','#createColumn', function (e) {

    e.preventDefault();
    let section = $(this).closest('.column-creation');
    let columnName = section.find('input[name="column"]').val();
    let cards = $('.ui-sortable-handle'); // all cards are selected
  
    let column =`
      <div>
        <section class="card column">
          <div class="column-handle">
            <div class="column-icons">
                <span class="oi oi-trash" name="trash" aria-hidden="true"></span>
                <span class="oi oi-plus" name="plus" aria-hidden="true"></span>
            </div>
            <h2 class="column-heading">${columnName}</h2>
          </div>
        </section>
      </div>`;
      
    $('body').find('.columns').append(column);
    $('.column').enableSorting();
    
    $('.column').enableSorting("makeSortable",'.column', '.ui-sortable-handle', '.column-card');
    cards.addClass("ui-sortable-handle"); //when sorting is reenabled for all the columns the ui-sortable-handle is removed from all cards so they have to be added agin
    createOnClickDialog();
    section.append('<h2>Create more columns?</h2>');
    section.find('form').remove();

  }); // creates a new column from the user specified name

  const createOnClickDialog = () => {

    $('.column').on('click','.column-card h3' , function() {

      let cardContent = $(this).closest('.column-card').find('.content');
      cardContent.show();
      cardContent.tabs();

      cardContent.dialog({minWidth: 350, close: function(event, ui) {
        cardContent.tabs("destroy");
        cardContent.dialog("destroy");
        cardContent.hide();
      }});

      cardContent.closest('.ui-dialog').find('button').addClass('btn');

    });

  }; //creates a dialog whith the content from the clicked card

  createOnClickDialog();
  

  $('body').on('click', '.ui-dialog h4', function () {

    $(this).next().toggle();
  }); // reveals the information related to the heading on the card

  
  $('body').on('click', '.ui-dialog .nav-item', function () {

    let navItems = $(this).closest('.nav').children();
    
    navItems.each(function () {
      $(this).find('a').removeClass('active');
    });

    $(this).find('a').addClass('active');
  }); // toggles the active class to corect element when using tabs

  $('body').on('click', '.oi-trash', function () {

    if($(this).closest('.column-card').length) {
      $(this).closest('.column-card').hide("explode", 1000).remove();
    } else {
      $(this).closest('.column').hide("explode", 1000).remove();
    } 
    
  }); /* checkes if there are any parents to the icon that have the .column-card class, 
  if so destroy selects and destroys the closest one if not destroy de closest column*/

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
    } // if there is no previusly created form then create one
    
    column.find('form').show({ effect: "scale"});
    column.find('input[name="date"]').datepicker();

    $(this).removeClass('oi-plus').addClass('oi-minus');


  }); // shows the form for creating new cards changes from plus-icon to minus

  
  $('.columns').on('click', '.oi-minus', function () {
    
    let column = $(this).closest('.column'); 
    column.find('form').hide({ effect: "scale"});
    $(this).removeClass('oi-minus').addClass('oi-plus');

  }); // hides form for creating new cards and resets minus-icon to plus

  $('body').on('click', "#createTask" ,function(e) {
    e.preventDefault();
    let task = $(this).siblings('input[name="task"]').val();
    let assignee = $(this).siblings('input[name="assignee"]').val();  
    let date = $(this).siblings('input[name="date"]').val();  
    let column = $(this).closest('.column');
    let card = `
    <div class="column-card card ui-sortable">
      <div class="ui-sortable-handle">
        <span class="oi oi-trash"></span>
        <div class="task">    
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
        </div>  
      </div>`;

    column.append(card).show({ effect: "scale"});
    
    $(this).closest('form').remove();
 
    column.find('.oi-minus').removeClass('oi-minus').addClass('oi-plus');
  }); // creates new card and hides form and resets minus-icon to plus


});