document.addEventListener("DOMContentLoaded", () => {
  /*------
  Header
  ------*/
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  /*------
  Show input in terms of role user - Signup form
  ------*/
  const selectListRole = document.getElementById("role");
  const checkRoleSignUpForm = () => {
    const selectListRole = document.getElementById("role");
    const options = selectListRole.querySelectorAll("option");
    const inputNurseName = document.getElementsByClassName(
      "input-nurse-data"
    )[0];
    const inputParentName = document.getElementsByClassName(
      "input-parent-data"
    )[0];

    return [...options].map(option => {
      const isParentSelected = option.value === "parent" && option.selected;
      const isNurseSelected = option.value === "nurse" && option.selected;

      if (isParentSelected) {
        inputParentName.classList.remove("isNotVisible");
        inputNurseName.classList.add("isNotVisible");
        inputNurseName.classList.remove("isVisible");
      } else if (isNurseSelected) {
        inputParentName.classList.add("isNotVisible");
        inputNurseName.classList.add("isVisible");
      }
    });
  };

  !!selectListRole &&
    selectListRole.addEventListener("change", () => {
      checkRoleSignUpForm();
    });

  !!selectListRole && checkRoleSignUpForm();
});


//Toggle checkbox

