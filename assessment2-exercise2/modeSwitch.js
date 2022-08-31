var flag = false;
function switchModes()
/* I turned the background black and the main text white with this code */
{
  if (!flag) {
    document.documentElement.style.backgroundColor = "#171219";
    document.documentElement.style.color = "#fff";
    document.documentElement.style.col-03 ;"#e4a5e7";
    flag = true;
  } else {
    document.documentElement.style.backgroundColor = "#f2fbeb";
    document.documentElement.style.color = "#000";
    document.documentElement.style.col-03 ;"#252592";
    flag = false;
  }
}
