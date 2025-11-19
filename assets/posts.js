(function(){
  function qs(name){
    var m = new RegExp('[?&]'+name+'=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g,' ')) : null;
  }

  var list = document.getElementById('all-posts');
  if(!list) return;

  var items = Array.prototype.slice.call(list.children);
  var pageSize = 10;
  var total = items.length;
  if(total <= pageSize) return; // nothing to paginate

  var totalPages = Math.ceil(total / pageSize);
  var current = parseInt(qs('page') || '1', 10);
  if(isNaN(current) || current < 1) current = 1;
  if(current > totalPages) current = totalPages;

  function showPage(p){
    current = p;
    items.forEach(function(li, idx){
      var start = (current-1)*pageSize;
      var end = start + pageSize;
      li.style.display = (idx >= start && idx < end) ? '' : 'none';
    });
    renderPager();
    var url = new URL(window.location.href);
    if(current === 1){ url.searchParams.delete('page'); }
    else { url.searchParams.set('page', String(current)); }
    window.history.replaceState(null, '', url.toString());
  }

  var pager = document.getElementById('pager');
  function renderPager(){
    if(!pager) return;
    var frag = document.createDocumentFragment();
    function btn(label, page, disabled, aria){
      var a = document.createElement('a');
      a.textContent = label;
      a.href = '#';
      a.setAttribute('role','button');
      if(aria) a.setAttribute('aria-label', aria);
      a.style.marginRight = '0.5rem';
      if(disabled){
        a.setAttribute('aria-disabled','true');
        a.style.pointerEvents='none';
        a.style.opacity='0.5';
      } else {
        a.addEventListener('click', function(e){ e.preventDefault(); showPage(page); });
      }
      frag.appendChild(a);
    }
    pager.innerHTML='';
    btn('Prev', Math.max(1, current-1), current === 1, 'Previous page');
    var maxButtons = Math.min(7, totalPages);
    var start = Math.max(1, current - Math.floor(maxButtons/2));
    var end = Math.min(totalPages, start + maxButtons - 1);
    if(end - start + 1 < maxButtons){ start = Math.max(1, end - maxButtons + 1); }
    for(var i=start;i<=end;i++){
      (function(page){
        var a = document.createElement('a');
        a.textContent = String(page);
        a.href = '#';
        a.style.marginRight = '0.5rem';
        if(page === current){
          a.setAttribute('aria-current','page');
          a.style.fontWeight='bold';
        } else {
          a.addEventListener('click', function(e){ e.preventDefault(); showPage(page); });
        }
        frag.appendChild(a);
      })(i);
    }
    btn('Next', Math.min(totalPages, current+1), current === totalPages, 'Next page');
    pager.appendChild(frag);
  }

  showPage(current);
})();
