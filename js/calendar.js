const loadSampleData = () => {
  document
    .getElementById("editor")
    .value = JSON.stringify(SAMPLE_DATA);
  document
    .getElementById("year")
    .value = "2020";

  document
    .getElementById("update-btn")
    .removeAttribute("disabled");
  handleEditorChange();
  handleUpdate();
};

const handleUpdate = () => {
  const editor = document
    .getElementById("editor")
    .value;
  const year = document
    .getElementById("year")
    .value;
  if (validateInput(editor) && validateYear(parseInt(year))) {
    calendar._clear();
    const editorObject = JSON.parse(editor);
    const birthdayMap = calendar._getBirthdayMap(editorObject, parseInt(year));
    setCal(birthdayMap);
  }

}

const setCal = calMap => {
  for (let [i,
    day]of Object.entries(DAY_MAP)) {
    const tileContainer = document.getElementById(day);
    let calDay = calMap[day]
      ? calMap[day]
      : [];
    if (calDay.length === 0) {
      tileContainer
        .classList
        .add('day--empty');
    } else {
      calDay = calendar._getSortedNamesByDOB(calDay);
      const height = calendar._getTileHeight(calDay, tileContainer);

      for (const name of calDay) {
        const div = document.createElement("div");
        div
          .classList
          .add('tile');
        div.style.height = height;
        div.style.width = height;
        div.setAttribute("title", name.name);
        div.style.backgroundColor = getColor();

        const p = document.createElement("p");
        p.textContent = name.initials;

        div.appendChild(p);
        tileContainer.appendChild(div);

      }
    }
    document
      .getElementById(`${day}-birthday-text`)
      .textContent = calendar._getBirthdayText(calDay.length);

  }
}

const calendar = {
  _getBirthdayMap: (dates, year) => {
    const empBirthdayMap = {};
    for (const it of dates) {
      let date = new Date(it.birthday);
      date.setFullYear(year);
      const weekday = DAY_MAP[date.getDay()];
      const names = empBirthdayMap[weekday] && empBirthdayMap[weekday].length
        ? empBirthdayMap[weekday]
        : [];
      empBirthdayMap[weekday] = names.concat({
        name: it.name,
        initials: getInitialsFromName(it.name),
        dob: it.birthday
      });
    }

    return empBirthdayMap;
  },
  _clear: () => {
    const calDays = document.querySelectorAll('.cal-day');
    for (const calDay of calDays) {
      calDay.children[1].innerHTML = "";
    }
  },
  _getBirthdayText: (birthdayCount = 0) => {
    let text;
    switch (birthdayCount) {
      case 1:
        text = `1 birthday`
        break;
      case 0:
        text = `No birthdays`
        break;
      default:
        text = `${birthdayCount} birthdays`
    }
    return text;
  },
  _getSortedNamesByDOB: (names) => {
    return names.sort(function (b, a) {
      const keyA = new Date(a.dob),
        keyB = new Date(b.dob);
      if (keyA < keyB) 
        return -1;
      if (keyA > keyB) 
        return 1;
      return 0;
    });
  },
  _getTileHeight: (noOftiles, tileContainer) => {
    let height;

    if (noOftiles.length === 1) {
      height = '100%';
    } else if (noOftiles.length > 1) {
      const calculateHeight = (tilesPerRow) => {
        let totalRows = Math.floor(noOftiles.length / tilesPerRow) + noOftiles.length % tilesPerRow;
        let totalHeight = parseInt(tileContainer.clientWidth / tilesPerRow) * totalRows;
        if (totalHeight < 180) {
          height = (tileContainer.clientWidth / tilesPerRow).toFixed(5) + "px";
        } else {
          calculateHeight(tilesPerRow + 1);
        }
      };
      calculateHeight(2)
    }
    return height;
  }
};
