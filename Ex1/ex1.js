let test = true;
let cur_page = 0;
let num_page = 0;
let outPut = '';

const loader = document.getElementsByClassName('loading');
const menu = document.getElementsByClassName('menu');
const scroller = document.getElementById('scrollable');


const loadData = () => { //load data from API
    try {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${cur_page}&size=${10}`).then(async(arrData) => {
            let results = await arrData.json();
            let airline = '';
            // console.log(results);
            for (let result = 0; result < 10; result++) {
                airline = results.data[result].airline;
                // console.log(airline);

                outPut += `<div class="items">` +
                    `<div>✈️: ${airline[0].name} - ${airline[0].country}</div>` +
                    `<div>&#128522;: ${results.data[result].name}</div>` +
                    `</div>`
            }
            setTimeout(async() => { //loading spinner
                await loading(false);
            }, 2000);

            if (cur_page == 2863) {
                outPut += `<div style="text-align: center;">End</div>`
            } else {
                outPut += `<hr>`
            }
            scroller.innerHTML = outPut;

            // console.log(airline[0].name, '-', airline[0].country)
            // console.log(results.data[0].name)
            test = true;
        });
    } catch (error) {
        console.log(error);
        cur_page--;
    }
};

const loading = (load) => { //loading spinner
    if (load == true) {
        loader[0].style.display = 'flex';
        menu[0].style.display = 'none';
    } else {
        loader[0].style.display = 'none';
        menu[0].style.display = 'flex';
    }
}

const pageNumber = (num) => { //display page number
    document.getElementsByClassName('page-number')[0].innerHTML = `Page: <span>${num}</span>`;
}

loading(true);
loadData();

//Main scrolling
scroller.addEventListener('scroll', () => {
    const clientHeight = scroller.clientHeight;
    const scollHeight = scroller.scrollHeight;
    const scrollTop = scroller.scrollTop;

    // console.log('client', clientHeight, ', height', scollHeight, ', Top', scrollTop);
    if (clientHeight + scrollTop + 200 >= scollHeight && test == true && cur_page <= 2862) {
        console.log('loading')
        loadData();
        cur_page++;
        test = false;
    }

    if (clientHeight + scrollTop > (1030 * (num_page + 1)) + 600) {
        num_page++;
        pageNumber(num_page);
        console.log(num_page)
    } else if (clientHeight + scrollTop <= (1030 * (num_page) + 500)) {
        num_page--;
        pageNumber(num_page);
        console.log(num_page)
    }
})