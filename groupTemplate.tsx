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

  <div className="group-item flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                <div className="text-gray-800">{groupName}</div>
            </div>
            <div className="flex items-center">
                <button onClick={onRemove} className="text-red-500 hover:text-red-700 focus:outline-none">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>