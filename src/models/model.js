class Model {
  assignAttributes = attributes => {
    Object.keys(attributes).forEach(attribute => {
      this[attribute] = attributes[attribute];
    });
  };
}

export default Model;
