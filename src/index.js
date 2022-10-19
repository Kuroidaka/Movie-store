const movieTempStorage = []

const movies = [
    {   
        id: 0,
        name: 'nha gia kim',
        img: 'https://oldglorydesign.co.uk/wp-content/uploads/2020/05/book-01-free-img.png',
        count: 1,
        price: 69000,
        totalCost: 69000
    },
    {   
        id: 1,
        name: 'Khoi nghiep 4.0',
        img: 'https://oldglorydesign.co.uk/wp-content/uploads/2020/05/book-01-free-img.png',
        count: 1,
        price: 139000,
        totalCost: 139000
    },
    {
        id: 2,
        name: 'tu duy phan bien',
        img: 'https://oldglorydesign.co.uk/wp-content/uploads/2020/05/book-01-free-img.png',
        count: 1,
        price: 850000,
        totalCost: 850000
    },
    {
        id: 3,
        name: 'tren duong bang',
        img: 'https://oldglorydesign.co.uk/wp-content/uploads/2020/05/book-01-free-img.png',
        count: 1,
        price: 800000,
        totalCost: 800000
    },
]

const App = {
    // hàm tạo ra cửa sổ khi nhấn vào giỏ hàng và rerender khi mà số lượng sản phẩm trong giỏ hàng bị thay đổi làm giá tiền thay đổi nên ta phải rerender lại
    renderWindow: function() {
        // lấy dữ liệu những quyễn sách đã mua từ local xuống
        const movies = JSON.parse(localStorage.getItem('movieTempStorage'))
        var sum = 0 

        // tính tổng giá tiền số tất cả Bộ phim
        movies.map((movie) => {
            if(movie.check){
                sum += movie.totalCost
            }
        })

        // kiểm tra nếu như dữ liệu phim trên local tồn tại thì thực hiện render
        if(movies){

            // phần header của cái bảng 
            var htmlHeader = `
            <h1>Hóa đơn</h1>
            Ngày mua: <p>${new Date()}}</p>
            MSSV: <p>18521519</p>
            Họ và tên khách hàng: <p>Huỳnh Thị Kim Trâm</p>
            <br>
            <table>
            <tr>
                <th>Phim</th>
                <th>SL</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
            `
    
            //phần body của cái bảng
            var htmlBody = movies.map((movie, id)=>{
                
                return (movie.check && `
                <tr>
                    <td>${movie.name}</td>
                    <td>${movie.count}</td>
                    <td>${movie.price}</td>
                    <td>${movie.totalCost}</td>
                </tr>
                
                `)
            })
            // phẩn footer
            var htmlFooter = `
            <tr>
                <td> <h1>Tổng tiền</h1> </td>
                <td></td>
                <td> <h1>${sum}</h1> </td>
            </tr> 
            `

            const html = htmlHeader + htmlBody + htmlFooter
            // tạo ra một trang mới 
            document.open()
            // in ra dữ liệu vào trang đó 
            document.write(html)
        }
      
       
        
    }, 
    // // hàm xử lí khi chọn mua sản phẩm
    handleChangeCount: function(event) {
        console.log(event.target.name);
        const movie = movies.find(movie => movie.name === event.target.name)
        
        const newMovie = {
            name: event.target.name, 
            price: movie.price, 
            id: movie.id,
            totalCost: movie.price,
            count: Number(event.target.value),
        }

        const findMovie = movieTempStorage.find(movie => movie.name === newMovie.name) 
        if(findMovie){
            movieTempStorage[findMovie.id].count = event.target.value
            movieTempStorage[findMovie.id].totalCost = event.target.value * movieTempStorage[findMovie.id].price
            localStorage.setItem('movieTempStorage', JSON.stringify(movieTempStorage))
        }
        else {
            movieTempStorage.push(newMovie); 
            localStorage.setItem('movieTempStorage', JSON.stringify(movieTempStorage))
        }
    },
    // hàm render ra màn hình các sản phẩm sách
    handleCheck: function(event) {
        const movie = movies.find(movie => movie.name === event.target.name)

        const newMovie = {
            name: event.target.name, 
            price: movie.price, 
            id: movie.id,
            totalCost: movie.price,
            count: movie.count,
            check: event.target.checked,
        }

        const findMovie = movieTempStorage.find(movie => movie.name === newMovie.name) 
        if(findMovie){
            movieTempStorage[findMovie.id].check = event.target.checked

            localStorage.setItem('movieTempStorage', JSON.stringify(movieTempStorage))
        }
        else {
            movieTempStorage.push(newMovie); 
            localStorage.setItem('movieTempStorage', JSON.stringify(movieTempStorage))
        }

    },
    render: function() {
        const htmls = movies.map((movie, id) => {
            return `
                <img src='${movie.img}' alt="movie" class="movie-img">
                <div>${movie.name}</div>
                <div>${movie.price}</div>
                Số lượng <input type="number" value=${movie.count} name='${movie.name}' onchange='App.handleChangeCount(event, ${id})'></input>
                Chọn mua <input type="checkbox" name='${movie.name}' onchange='App.handleCheck(event, ${id})' >    
            `

        })
        const list = document.querySelector('.movie-list').innerHTML = htmls.join('')
    },
    start: function() {
        this.render()
    }

}

App.start()