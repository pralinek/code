groupTemplate: function(group) {
    var container = document.createElement('div');
    var label = document.createElement('span');
    label.innerHTML = group.content;
    container.insertAdjacentElement('afterBegin',label);
    label.addEventListener('click',function() {
        // add instructions here
    });
    return container;
  },