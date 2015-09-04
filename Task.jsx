Task = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required

    task: React.PropTypes.object.isRequired

  },

    //metodo que verica si esta chequeado un task
  toggleChecked() {
       Tasks.update(this.props.task._id, {
      // Pone el estado en chequeado si no esta previamente
      $set: {checked: ! this.props.task.checked}

    });

  },

  deleteThisTask() {
    //borra el task invocando  la propiedad de arriba que pertenece al id
    Tasks.remove(this.props.task._id);

  },  

  render() {
    // Le da una propiedad diferente al tasks cuando se le da click
    // pregunta si esta checked
    const taskClassName = this.props.task.checked ? "checked" : "";

     return (

      <li className={taskClassName}>

        <button className="delete" onClick={this.deleteThisTask}>

          &times;

        </button>

 
        <input
          type="checkbox"

          readOnly={true}

          checked={this.props.task.checked}

          onClick={this.toggleChecked} />

        <span className="text">{this.props.task.text}</span>

      </li>

    );
  }

});

//VOY EN LA 5.1