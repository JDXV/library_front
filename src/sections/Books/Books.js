import React, { Component } from 'react';
import Modal from '../../components/Modal';
import Cookie from '../tools/Cookies';
import $ from 'jquery';
import swal from 'sweetalert';
import './Books.scss';
class BooksAdmin extends Component {
    constructor(props) {
        super(props);
        if (props.user === null) {
        }
        this.state = {
            books: [],
            loans: [],
            header: "",
            body: "",
            modal: "",
            rol: "",
            book: ""
        }

    }

    render() {
        return (
            <div className="books books-admin">
                <div className='container'>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#books" role="tab" aria-controls="home" aria-selected="true">Books</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#leads" role="tab" aria-controls="profile" aria-selected="false">Loans</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" >
                    <div className="tab-pane fade show active" id="books" role="tabpanel" aria-labelledby="home-tab">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='options'>
                                        <button id="add-book" className='btn btn-outline-primary add-book' data-toggle="modal" data-target=".modal-window" onClick={this.openCreate}>Add</button>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                {this.state.books.map((val, key) =>
                                    <div className='col-6' key={key}>
                                        <div className='book' data-meta={JSON.stringify(val)}>
                                            <div className='title'>{val.title}</div>
                                            <div className='data'>
                                                {/* <div className='id'>{val.id}</div> */}
                                                <div className='isbn'>isbn: {val.isbn}</div>
                                                <div className='editorial'>editorial: {val.editorial}</div>
                                                <div className='edition'>edition: {val.edition}</div>
                                                <div className='clibrary'>library code: {val.clibrary}</div>
                                                <div className='language'>language: {val.language}</div>
                                                {val.state === 'ACTIVE' ? (
                                                    <div className='state'>state: <strong className='text-success'>{val.state}</strong></div>
                                                ) : (
                                                        <div className='state'>state: <strong className='text-danger'>{val.state}</strong></div>
                                                    )}
                                            </div>
                                            <button id="edit-book" className='btn btn-info change edit-book' data-toggle="modal" data-target=".modal-window" onClick={(e) => this.openEdit(e)} >Edit</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="leads" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='container'>
                            <table class="table" cellSpacing='0'>
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Options</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.loans.map((val, key) =>
                                        <tr data-meta={JSON.stringify(val)}>
                                            {val.state === 'DELIVERED' ? (
                                                <td><button className='btn btn-sm btn-info return' disabled>DELIVERED</button></td>
                                            ) : (
                                                    <td><button className='btn btn-sm btn-info return'>Return</button></td>
                                                )}
                                            <td>{val.name}</td>
                                            <td>{val.title}</td>
                                            <td>{val.delivery}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {this.state.modal === 'create' ? (
                    <Modal body={<FormCreateBook />} />
                ) : (
                        <Modal body={<FormEditBook />} />
                    )}
            </div>
        );
    }

    openCreate = () => {
        this.setState({
            modal: "create"
        });
    }

    openEdit = e => {
        var book = JSON.parse($(e.target).parents(".book").attr("data-meta"));
    }

    typeModal = e => {
        this.setState({
            modal: e.target.id
        })
    }

    componentDidMount() {
        $("body").on("click", ".edit-book", function (e) {
            var book = JSON.parse($(this).parents(".book").attr("data-meta"));
            $("#form-edit-book #id").val(book._id);
            $("#form-edit-book #title").val(book.title);
            $("#form-edit-book #editorial").val(book.editorial);
            $("#form-edit-book #isbn").val(book.isbn);
            $("#form-edit-book #edition").val(book.edition);
            $("#form-edit-book #clibrary").val(book.clibrary);
            $("#form-edit-book #language").val(book.language);
            $("#form-edit-book #state").val(book.state);

        });
        $("body").on("click", ".return", function (e) {
            $(e.target).attr("disabled", "disabled");
            var book = JSON.parse($(this).parents("tr").attr("data-meta"));
            $.ajax({
                type: 'POST',
                url: `http://192.168.0.14:1212/service/rutloan`,
                data: {
                    cbook: book.cbook,
                    loan: book._id
                },
                success: (res) => {
                    swal({
                        title: "Return Success",
                        text: "",
                        icon: "success",
                    }).then(() => {
                        $(e.target).attr("disabled", "");
                        $(".modal").modal("hide");
                    });
                },
                error: function (xhr, status, err) { }
            });
        });
        $.ajax({
            type: 'GET',
            url: `http://192.168.0.14:1212/service/books`,
            success: (res) => {
                this.setState({
                    books: res,
                });
            },
            error: function (xhr, status, err) { }
        });
        $.ajax({
            type: 'GET',
            url: `http://192.168.0.14:1212/service/loans`,
            success: (res) => {
                if (res.lenght !== 0) {
                    this.setState({
                        loans: res,
                    });
                }
            },
            error: function (xhr, status, err) { }
        });
    }
}

class FormCreateBook extends Component {
    render() {
        return (
            <form id='form-create-book'>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input id="title" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='editorial'>Editorial</label>
                    <input id="editorial" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='isbn'>ISBN</label>
                    <input id="isbn" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='edition'>Edition</label>
                    <input id="edition" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='clibrary'>Library Code</label>
                    <input id="clibrary" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <label htmlFor='language'>Language</label>
                    <input id="language" className="form-control" type="text" />
                </div>
                <div className='form-group'>
                    <button className='btn btn-info' onClick={(e) => this.saveBook(e)}>Save</button>
                </div>
            </form>
        );
    }
    saveBook(e) {
        e.preventDefault();
        $(e.target).attr("disabled", "disabled");
        var title = $("#title").val();
        var editorial = $("#editorial").val();
        var isbn = $("#isbn").val();
        var edition = $("#edition").val();
        var clibrary = $("#clibrary").val();
        var language = $("#language").val();
        $.ajax({
            type: 'POST',
            url: `http://192.168.0.14:1212/service/createbook`,
            data: {
                title: title,
                editorial: editorial,
                isbn: isbn,
                edition: edition,
                clibrary: clibrary,
                language: language
            },
            success: (res) => {
                swal({
                    title: "Saved Book",
                    text: "",
                    icon: "success",
                }).then(() => {
                    $(e.target).attr("disabled", "");
                    $(".modal").modal("hide");
                    document.location.href = "";
                });
            },
            error: function (xhr, status, err) { }
        });
    }
}
class FormEditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <form id='form-edit-book' data-meta={this.props.meta}>
                <input id="id" className="form-control" type="hidden" />
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input id="title" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='editorial'>Editorial</label>
                    <input id="editorial" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='isbn'>ISBN</label>
                    <input id="isbn" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='edition'>Edition</label>
                    <input id="edition" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='clibrary'>Library Code</label>
                    <input id="clibrary" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='language'>Language</label>
                    <input id="language" className="form-control" type="text" onChange={this.inputChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='state'>State</label>
                    <select id="state" className="form-control">
                        <option value='ACTIVE'>ACTIVE</option>
                        <option value='LOAN'>LOAN</option>
                    </select>
                </div>
                <div className='form-group'>
                    <button type='bottom' className='btn btn-info save-edit-book'>Save</button>
                </div>
            </form>
        );
    }
    componentDidMount() {
        var prueba = {
            title: "title",
            editorial: "editorial",
            isbn: "isbn",
            edition: "edition",
            create: "create",
            clibrary: "clibrary",
            state: "state",
            language: "language"
        }
        $("body").on("click", ".save-edit-book", function (e) {
            e.preventDefault();
            $(e.target).attr("disabled","disabled");
            var id = $("#form-edit-book #id").val();
            var title = $("#form-edit-book #title").val();
            var editorial = $("#form-edit-book #editorial").val();
            var isbn = $("#form-edit-book #isbn").val();
            var edition = $("#form-edit-book #edition").val();
            var clibrary = $("#form-edit-book #clibrary").val();
            var language = $("#form-edit-book #language").val();
            var state = $("#form-edit-book #state").val();
            $.ajax({
                type: 'POST',
                url: `http://192.168.0.14:1212/service/uptobook`,
                data: {
                    id: id,
                    title: title,
                    editorial: editorial,
                    isbn: isbn,
                    edition: edition,
                    clibrary: clibrary,
                    language: language,
                    state: state,
                },
                success: (res) => {
                    swal({
                        title: "Saved Book",
                        text: "",
                        icon: "success",
                    }).then(() => {
                        $(e.target).attr("disabled", "");
                        $(".modal").modal("hide");
                        document.location.href = "";
                    });
                },
                error: function (xhr, status, err) { }
            });
        });
    }
    saveBook(e) {
        e.preventDefault();
        $(e.target).attr("disabled", "disabled");
        var title = $("#title").val();
        var editorial = $("#editorial").val();
        var isbn = $("#isbn").val();
        var edition = $("#edition").val();
        var clibrary = $("#clibrary").val();
        var language = $("#language").val();
        $.ajax({
            type: 'POST',
            url: `http://192.168.0.14:1212/service/uptobook`,
            data: {
                title: title,
                editorial: editorial,
                isbn: isbn,
                edition: edition,
                clibrary: clibrary,
                language: language
            },
            success: (res) => {
                swal({
                    title: "Saved Book",
                    text: "",
                    icon: "success",
                }).then(() => {
                    $(e.target).attr("disabled", "");
                    $(".modal").modal("hide");
                    document.location.href = "";
                });
            },
            error: function (xhr, status, err) { }
        });
    }
}

class BooksClient extends Component {
    constructor(props) {
        super(props);
        if (!this.props.user) {
        } else {
            props.history.push("/");
        }
        this.state = {
            books: [],
            loans: [],
            header: "",
            body: "",
            modalBody: "",
            book: ""
        }
    }


    render() {
        return (
            <div className="books books-client">
                <div className='container'>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#books" role="tab" aria-controls="home" aria-selected="true">Books</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#leads" role="tab" aria-controls="profile" aria-selected="false">Loans</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" >
                    <div className="tab-pane fade show active" id="books" role="tabpanel" aria-labelledby="home-tab">
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='options'>
                                        <div className='form-group'>
                                            <input type='search' className='form-control search-book' placeholder='look for the title of the book' />
                                            <button className='btn btn-info send-search'>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                {this.state.books.map((val, key) =>
                                    <div className='col-6' key={key}>
                                        <div className='book' data-meta={JSON.stringify(val)}>
                                            <div className='title'>Nombre</div>
                                            <div className='data'>
                                                {/* <div className='id'>{val.id}</div> */}
                                                <div className='isbn'>isbn: {val.isbn}</div>
                                                <div className='editorial'>editorial: {val.editorial}</div>
                                                <div className='edition'>edition: {val.edition}</div>
                                                <div className='clibrary'>library code: {val.clibrary}</div>
                                                <div className='language'>language: {val.language}</div>
                                                {val.state === 'ACTIVE' ? (
                                                    <div className='state'>state: <strong className='text-success'>{val.state}</strong></div>
                                                ) : (
                                                        <div className='state'>state: <strong className='text-danger'>{val.state}</strong></div>
                                                    )}
                                            </div>
                                            {val.state === 'ACTIVE' ? (
                                                <button className='btn btn-warning change rent-book' data-toggle="modal" data-target=".modal-window">Rent</button>
                                            ) : (
                                                    <button className='btn btn-warning change rent-book' disabled>Not Enabled</button>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="leads" role="tabpanel" aria-labelledby="profile-tab">
                        <div className='container'>
                            <table class="table" cellSpacing='0'>
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.loans.map((val, key) =>
                                        <tr>
                                            <td>{val.name}</td>
                                            <td>{val.title}</td>
                                            <td>{val.delivery}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal body={<FormCreateLoan />} />
            </div>
        );
    }

    openCreate = () => {
        this.setState({
            modal: "create"
        });
    }

    openEdit = e => {
        var book = JSON.parse($(e.target).parents(".book").attr("data-meta"));
        this.setState({
            modal: "edit",
            book: book
        });
    }

    typeModal = e => {
        this.setState({
            modal: e.target.id
        })
    }

    componentDidMount() {
        $("body").on("click", ".rent-book", function () {
            var book = JSON.parse($(this).parents(".book").attr("data-meta"));
            $("#form-create-loan #clibrary").val(book.clibrary);
            $("#form-create-loan #cuser").val(Cookie.getCookie("id"));
            $("#form-create-loan #name").val(Cookie.getCookie("name"));
            $("#form-create-loan #title").val(book.title);
            $("#form-create-loan #cbook").val(book._id);
        });
        $("body").on("click", ".send-search", function () {
            var search = $(".search-book").val();
            $.ajax({
                type: 'GET',
                url: `http://192.168.0.14:1212/service/books`,
                success: (res) => {
                    if (res) {
                        swal({
                            title: "Search Complete",
                            text: "yes, there is the book",
                            icon: "success",
                        }).then(() => {
                            $(".modal").modal("hide");
                        });
                    } else {
                        swal({
                            title: "Search Complete",
                            text: "there is no book",
                            icon: "success",
                        }).then(() => {
                            $(".modal").modal("hide");
                        });
                    }
                },
                error: function (xhr, status, err) { }
            });
        });
        $.ajax({
            type: 'GET',
            url: `http://192.168.0.14:1212/service/books`,
            success: (res) => {
                this.setState({
                    books: res,
                });
            },
            error: function (xhr, status, err) { }
        });
        var id = Cookie.getCookie("id");
        $.ajax({
            type: 'GET',
            url: `http://192.168.0.14:1212/service/loans/${id}`,
            success: (res) => {
                if (res.lenght !== 0) {
                    this.setState({
                        loans: res,
                    });
                }
            },
            error: function (xhr, status, err) { }
        });
    }
}

class FormCreateLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <form id='form-create-loan'>
                <div className='form-group'>
                    <label htmlFor='cuser'>Name</label>
                    <input id="name" className="form-control" type="text" disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='cuser'>Title</label>
                    <input id="title" className="form-control" type="text" disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='clibrary'>Library Code</label>
                    <input id="clibrary" className="form-control" type="text" disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='cuser'>User Code</label>
                    <input id="cuser" className="form-control" type="text" disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='floan'>Date</label>
                    <input id="floan" className="form-control" type="date" />
                </div>
                <div className='form-group'>
                    <label htmlFor='return'>Return</label>
                    <input id="return" className="form-control" type="date" />
                </div>
                <div className='form-group'>
                    <label htmlFor='cbook'>Book Code</label>
                    <input id="cbook" className="form-control" type="text" disabled />
                </div>
                <div className='form-group'>
                    <button className='btn btn-info' onClick={(e) => this.saveLoan(e)}>Save</button>
                </div>
            </form>
        );
    }
    saveLoan(e) {
        e.preventDefault();
        $(e.target).attr("disabled", "disabled");
        var clibrary = $("#clibrary").val();
        var cuser = $("#cuser").val();
        var floan = $("#floan").val();
        var cbook = $("#cbook").val();
        var ret = $("#ret").val();
        var delivery = "";
        var name = $("#name").val();
        var title = $("#title").val();
        $.ajax({
            type: 'POST',
            url: `http://192.168.0.14:1212/service/createloan`,
            data: {
                clibrary: clibrary,
                cuser: cuser,
                floan: floan,
                cbook: cbook,
                ret: ret,
                delivery: delivery,
                name: name,
                title: title,
            },
            success: (res) => {
                swal({
                    title: "Loan complete",
                    text: "",
                    icon: "success",
                }).then(() => {
                    $(e.target).attr("disabled", "");
                    $(".modal").modal("hide");
                    document.location.href = "";
                });
            },
            error: function (xhr, status, err) { }
        });
    }
}
export { BooksAdmin, BooksClient };