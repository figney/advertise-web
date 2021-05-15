function Counter(selector, settings){
  this.settings = Object.assign({
    digits: 5,
    delay: 250, // ms
    direction: ''  // ltr is default
  }, settings || {})

  this.DOM = {}
  this.build(selector)

  this.DOM.scope.addEventListener('transitionend', e => {
    e.target.classList.remove('blur')
  })

  this.count()
}

Counter.prototype = {
  // generate digits markup
  build( selector ){
    let scopeElm = typeof selector == 'string'
      ? document.querySelector(selector)
      : selector
        ? selector
        : this.DOM.scope

    let innerHtml = ''
    for (let i = 0; i <= 9; i++) {
      innerHtml += `<div>${i}</div>`
    }
    scopeElm.innerHTML = Array(this.settings.digits + 1)
      .join(`<div><b data-value="0">${innerHtml}</b></div>`);

    this.DOM = {
      scope : scopeElm,
      digits : scopeElm.querySelectorAll('b')
    }
  },

  count( newVal ){
    let countTo, className,
      settings = this.settings,
      digitsElms = this.DOM.digits;

    // update instance's value
    this.value = newVal || this.DOM.scope.dataset.value|0

    if( !this.value ) return;

    // convert value into an array of numbers
    countTo = (this.value+'').split('')

    if( settings.direction == 'rtl' ){
      countTo = countTo.reverse()
      digitsElms = [].slice.call(digitsElms).reverse()
    }

    // loop on each number element and change it
    digitsElms.forEach(function(item, i){
      if( +item.dataset.value != countTo[i]  &&  countTo[i] >= 0 )
        setTimeout(function(j){
          let diff = Math.abs(countTo[j] - +item.dataset.value);
          item.dataset.value = countTo[j]
          if( diff > 0 )
            item.className = 'blur';
        }, i * settings.delay, i)
    })
  }
}

export default Counter