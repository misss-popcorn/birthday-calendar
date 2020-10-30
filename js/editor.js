const isValidInput = (value) => {
  let jsonObject;
  const input = {
    isJSON: () => {
      try {
        jsonObject = JSON.parse(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    isArray: () => {
      return Array.isArray(jsonObject);
    },
    hasValidFormat: () => {

      for (let it of jsonObject) {
        const jsonKeys = Object.keys(it);
        if (jsonKeys.length === 2 && jsonKeys.indexOf("name") !== -1 && jsonKeys.indexOf("birthday") !== -1) {
          if (it.name && isDateValid(it.birthday)) {
            continue;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
  };
  return input.isJSON() && input.isArray() && input.hasValidFormat() && !!value;

}

const handleEditorChange = () => {
  let editor = document.getElementById("editor");
  if (!!!editor.value) 
    return;
  const isValid = validateInput(editor.value);
  if (isValid) {
    const jsonObject = JSON.parse(editor.value);
    editor.value = JSON.stringify(jsonObject, undefined, 4);
  }
}

const validateInput = (value) => {
  if (isValidInput(value)) {
    document
      .getElementById("editor-error")
      .style
      .display = "none";
      return true;
  } else {
    document
      .getElementById("editor-error")
      .style
      .display = "block";
      return false;
  }
};
