let test = true;
    let cur_page = 0;
    let num_page = 0;
    let outPut = '';

const loader = document.getElementsByClassName('loading');
const menu = document.getElementsByClassName('menu');
const scroller = document.getElementById('scrollable');

const loadData = () => { //load data from API
    try {
        if (localStorage.getItem('page0') && cur_page == 0) {
            let data1 = [{}];
            for (i = 0; i < localStorage.length; i++) {
                    data1[i] = JSON.parse(localStorage.getItem(`page${i}`));
            // console.log(data1[i]);

                for (j in data1[i]) {
                    outPut += `<div class="items">` +
                    `<div>✈️: ${data1[i][j].airline[0].name} - ${data1[i][j].airline[0].country}</div>` +
                    `<div>&#128512;: ${data1[i][j].name}</div>` +
                    `</div>`
                }
                if (cur_page == 2863) {
                    outPut += `<div style="text-align: center;">End</div>`
                } else {
                    outPut += `<hr>`
                }
            }

                scroller.innerHTML = outPut;
                loading(false);
                cur_page = i;
        } else if (cur_page >= 0) {
fetch(`https://api.instantwebtools.net/v1/passenger?page=${cur_page}&size=${10}`).then(async(arrData) => {
    let results = await arrData.json();
    let airline = '';
    let data = [{}];
    // console.log(results);

        for (let result = 0; result < 10; result++) {
            airline = results.data[result].airline;
            // console.log(airline);

            const dataAdd = {
                name: `${results.data[result].name}`,
                airline: [{
                    name: `${airline[0].name}`,
                    country: `${airline[0].country}`
                }]
            };

                data[result] = dataAdd;
                outPut += `<div class="items">` +
                `<div>✈️: ${airline[0].name} - ${airline[0].country}</div>` +
                `<div>&#128540;: ${results.data[result].name}</div>` +
                `</div>`
        }
        console.log(data)
        // console.log('name', data[0].name, 'name', data[0].airline[0].name, 'country', data[0].airline[0].country);
        localStorage.setItem(`page${cur_page}`, JSON.stringify(data));

        setTimeout(async() => { 
            //loading spinner
            await loading(false);
        }, 2000);

        if (cur_page == 2863) {
            outPut += `<div style="text-align: center;">End</div>`
        } else {
            outPut += `<hr>`
        }
            scroller.innerHTML = outPut;
            test = true;
                });
            }
        } 
            catch (error) {
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
                localStorage.length = '';
                loadData();
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