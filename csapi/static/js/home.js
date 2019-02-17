/*
 * JavaScript file for the application to demonstrate
 * using the API
 */

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function () {
  'use strict';

  let $event_pump = $('body');

  // Return the API
  return {
    'read': function () {
      let ajax_options = {
        type: 'GET',
        url: 'api/people',
        accepts: 'application/json',
        dataType: 'json'
      };
      $.ajax(ajax_options)
        .done(function (data) {
          $event_pump.trigger('model_read_success', [data]);
        })
        .fail(function (xhr, textStatus, errorThrown) {
          $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
        })
    },
    create: function (person) {
      let ajax_options = {
        type: 'POST',
        url: 'api/people',
        accepts: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(person)
      };
      $.ajax(ajax_options)
        .done(function (data) {
          $event_pump.trigger('model_create_success', [data]);
        })
        .fail(function (xhr, textStatus, errorThrown) {
          $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
        })
    },
    update: function (person) {
      let ajax_options = {
        type: 'PUT',
        url: `api/people/${person.person_id}`,
        accepts: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(person)
      };
      $.ajax(ajax_options)
        .done(function (data) {
          $event_pump.trigger('model_update_success', [data]);
        })
        .fail(function (xhr, textStatus, errorThrown) {
          $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
        })
    },
    'delete': function (person_id) {
      let ajax_options = {
        type: 'DELETE',
        url: `api/people/${person_id}`,
        accepts: 'application/json',
        contentType: 'plain/text'
      };
      $.ajax(ajax_options)
        .done(function (data) {
          $event_pump.trigger('model_delete_success', [data]);
        })
        .fail(function (xhr, textStatus, errorThrown) {
          $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
        })
    }
  };
}());

// Create the view instance
ns.view = (function () {
  'use strict';

  let $person_id = $('#person_id'),
    $Survived = $('#Survived'),
    $Pclass = $('#Pclass'),
    $Name = $('#Name'),
    $Sex = $('#Sex'),
    $Age = $('#Age'),
    $SiblingsSpousesAboard = $('#SiblingsSpousesAboard'),
    $ParentsChildrenAboard = $('#ParentsChildrenAboard'),
    $Fare = $('#Fare');

  // return the API
  return {
    reset: function () {
      $person_id.val('');
      $Survived.val('').focus();
      $Pclass.val('');
      $Name.val('');
      $Sex.val('');
      $Age.val('');
      $SiblingsSpousesAboard.val('');
      $ParentsChildrenAboard.val('');
      $Fare.val('');
    },
    update_editor: function (person) {
      $person_id.val(person.person_id);
      $Survived.val(person.Survived).focus();
      $Pclass.val(person.Pclass);
      $Name.val(person.Name);
      $Sex.val(person.Sex);
      $Age.val(person.Age);
      $SiblingsSpousesAboard.val(person.SiblingsSpousesAboard);
      $ParentsChildrenAboard.val(person.ParentsChildrenAboard);
      $Fare.val(person.Fare);
    },
    build_table: function (people) {
      let rows = ''

      // clear the table
      $('.people table > tbody').empty();

      // did we get a people array?
      if (people) {
        for (let i = 0, l = people.length; i < l; i++) {
          rows += `<tr data-person-id="${people[i].person_id}">
                        <td class="Survived">${people[i].Survived}</td>
                        <td class="Pclass">${people[i].Pclass}</td>
                        <td class="Name">${people[i].Name}</td>
                        <td class="Sex">${people[i].Sex}</td>
                        <td class="Age">${people[i].Age}</td>
                        <td class="SiblingsSpousesAboard">${people[i].SiblingsSpousesAboard}</td>
                        <td class="ParentsChildrenAboard">${people[i].ParentsChildrenAboard}</td>
                        <td class="Fare">${people[i].Fare}</td>
                        <td>${people[i].timestamp}</td>
                    </tr>`;
        }
        $('table > tbody').append(rows);
      }
    },
    error: function (error_msg) {
      $('.error')
        .text(error_msg)
        .css('visibility', 'visible');
      setTimeout(function () {
        $('.error').css('visibility', 'hidden');
      }, 3000)
    }
  };
}());

// Create the controller
ns.controller = (function (m, v) {
  'use strict';

  let model = m,
    view = v,
    $event_pump = $('body'),
    $person_id = $('#person_id'),
    $Survived = $('#Survived'),
    $Pclass = $('#Pclass'),
    $Name = $('#Name'),
    $Sex = $('#Sex'),
    $Age = $('#Age'),
    $SiblingsSpousesAboard = $('#SiblingsSpousesAboard'),
    $ParentsChildrenAboard = $('#ParentsChildrenAboard'),
    $Fare = $('#Fare');

  // Get the data from the model after the controller is done initializing
  setTimeout(function () {
    model.read();
  }, 100)

  // Validate input
  function validate(Survived, Pclass, Name, Sex, Age, SiblingsSpousesAboard, ParentsChildrenAboard, Fare) {
    return Survived !== "" && Pclass !== "" && Name !== "" && Sex !== "" && Age !== "" && SiblingsSpousesAboard !== "" && ParentsChildrenAboard !== "" && Fare !== "";
  }

  // Create our event handlers
  $('#create').click(function (e) {
    let Survived = $Survived.val(),
      Pclass = $Pclass.val(),
      Name = $Name.val(),
      Sex = $Sex.val(),
      Age = $Age.val(),
      SiblingsSpousesAboard = $SiblingsSpousesAboard.val(),
      ParentsChildrenAboard = $ParentsChildrenAboard.val(),
      Fare = $Fare.val();

    e.preventDefault();

    if (validate(Survived, Pclass, Name, Sex, Age, SiblingsSpousesAboard, ParentsChildrenAboard, Fare)) {
      model.create({
        'Survived': Survived,
        'Pclass': Pclass,
        'Name': Name,
        'Sex': Sex,
        'Age': Age,
        'SiblingsSpousesAboard': SiblingsSpousesAboard,
        'ParentsChildrenAboard': ParentsChildrenAboard,
        'Fare': Fare,
      })
    } else {
      alert('Problem with input');
    }
  });

  $('#update').click(function (e) {
    let person_id = $person_id.val(),
      Survived = $Survived.val(),
      Pclass = $Pclass.val(),
      Name = $Name.val(),
      Sex = $Sex.val(),
      Age = $Age.val(),
      SiblingsSpousesAboard = $SiblingsSpousesAboard.val(),
      ParentsChildrenAboard = $ParentsChildrenAboard.val(),
      Fare = $Fare.val();

    e.preventDefault();

    if (validate(Survived, Pclass, Name, Sex, Age, SiblingsSpousesAboard, ParentsChildrenAboard, Fare)) {
      model.update({
        person_id: person_id,
        Survived: Survived,
        Pclass: Pclass,
        Name: Name,
        Sex: Sex,
        Age: Age,
        SiblingsSpousesAboard: SiblingsSpousesAboard,
        ParentsChildrenAboard: ParentsChildrenAboard,
        Fare: Fare,
      })
    } else {
      alert('Problem with input');
    }
    e.preventDefault();
  });

  $('#delete').click(function (e) {
    let person_id = $person_id.val();

    e.preventDefault();

    if (validate('placeholder', Survived)) {
      model.delete(person_id)
    } else {
      alert('Problem with input');
    }
    e.preventDefault();
  });

  $('#reset').click(function () {
    view.reset();
  })

  $('table > tbody').on('dblclick', 'tr', function (e) {
    let $target = $(e.target),
      person_id,
      Survived,
      Pclass,
      Name,
      Sex,
      Age,
      SiblingsSpousesAboard,
      ParentsChildrenAboard,
      Fare;

    person_id = $target
      .parent()
      .attr('data-person-id');

    Survived = $target
      .parent()
      .find('td.Survived')
      .text();

    Pclass = $target
      .parent()
      .find('td.Pclass')
      .text();

    Name = $target
      .parent()
      .find('td.Name')
      .text();

    Sex = $target
      .parent()
      .find('td.Sex')
      .text();

    Age = $target
      .parent()
      .find('td.Age')
      .text();

    SiblingsSpousesAboard = $target
      .parent()
      .find('td.SiblingsSpousesAboard')
      .text();

    ParentsChildrenAboard = $target
      .parent()
      .find('td.ParentsChildrenAboard')
      .text();

    Fare = $target
      .parent()
      .find('td.Fare')
      .text();

    view.update_editor({
      person_id: person_id,
      Survived: Survived,
      Pclass: Pclass,
      Name: Name,
      Sex: Sex,
      Age: Age,
      SiblingsSpousesAboard: SiblingsSpousesAboard,
      ParentsChildrenAboard: ParentsChildrenAboard,
      Fare: Fare,
    });
  });

  // Handle the model events
  $event_pump.on('model_read_success', function (e, data) {
    view.build_table(data);
    view.reset();
  });

  $event_pump.on('model_create_success', function (e, data) {
    model.read();
  });

  $event_pump.on('model_update_success', function (e, data) {
    model.read();
  });

  $event_pump.on('model_delete_success', function (e, data) {
    model.read();
  });

  $event_pump.on('model_error', function (e, xhr, textStatus, errorThrown) {
    let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
    view.error(error_msg);
    console.log(error_msg);
  })
}(ns.model, ns.view));
