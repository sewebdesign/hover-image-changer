function initHoverImageChanger() {
  const listContainers = document.querySelectorAll('.user-items-list[data-space-below-section-title-value="101"]');
  for (const listContainer of listContainers) {
    const gridGap = listContainer.querySelector('.user-items-list-item-container').getAttribute('data-space-between-columns') || listContainer.querySelector('.user-items-list-item-container').getAttribute('data-space-between-slides-value') + 'px';
    listContainer.style.setProperty('--grid-gap', gridGap);

    const timeDelay = listContainer.querySelector('.user-items-list-item-container').getAttribute('data-max-columns') || listContainer.querySelector('.user-items-list-item-container').getAttribute('data-num-columns');
    
    const listItems = listContainer.querySelectorAll('.list-item');
    const firstItem = listItems[0];
    firstItem.classList.add('active');
    
    let interval;

    const timer = function () {
      if (timeDelay == 1) {
        return;
      }
      if (!document.body.classList.contains('sqs-edit-mode-active')) {
        interval = setInterval(function () {
          const currentlySelected = listContainer.querySelector('.list-item.active');
          const nextSelected = currentlySelected.nextElementSibling || firstItem;
          currentlySelected.classList.remove('active');
          nextSelected.classList.add('active');
        }, timeDelay * 1000);
      }
    };

    const handleListItemFocus = function () {
      clearInterval(interval);
      for (const item of listItems) {
        item.classList.remove('active');
      }
      this.classList.add('active');
    };

    const handleListItemHover = function () {
      clearInterval(interval);
      for (const item of listItems) {
        item.classList.remove('active');
      }
      this.classList.add('active');
    };

    const handleListItemHoverOut = function () {
      if (listContainer.querySelector('.list-item:focus-visible, .list-item:focus-within')) {
        return;
      }
      timer();
    };

    for (const listItem of listItems) {
      listItem.setAttribute('tabindex', 0);
      listItem.addEventListener('mouseover', handleListItemHover);
      listItem.addEventListener('mouseout', handleListItemHoverOut);
      listItem.addEventListener('click', handleListItemHover);
      listItem.addEventListener('focus', handleListItemFocus);
      listItem.addEventListener('blur', handleListItemHoverOut);
    }

    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        clearInterval(interval);
        timer();
      } else {
        clearInterval(interval);
      }
    });
    observer.observe(listContainer);
  }
}
document.addEventListener('DOMContentLoaded', function() {
   initHoverImageChanger();
});
