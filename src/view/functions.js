const create=function(where,what){
    return where.appendChild(document.createElement(what));
};

const container=function(containerName){
    return document.body.querySelector("#container-"+containerName);
  };

const deleteAll=function(parent){
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
      }
};