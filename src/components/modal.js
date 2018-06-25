import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="modal fade modal-window" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <h2>{this.props.header}</h2>
                        <div className='modal-body'>
                            {this.props.body}
                        </div>
                        {/* <Container type={ins.container} content={ins.content} cant={ins.cant} properties={ins.properties} /> */}
                        {/* <Footer type={ins.footer} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

// class Container extends Component {
//     render() {
//         if (this.props.type === "form") {
//             return (
//                 <form className="form-modal">
//                     <Content content={this.props.content} cant={this.props.cant} properties={this.props.properties} />
//                 </form>
//             )
//         } else {
//             return (<input type="text" defaultValue="0" />)
//         }
//     }
// }

// class Content extends Component {
//     render() {
//         if (this.props.content === "input") {
//             var comp = [];
//             for (var i = 0; i < this.props.properties.length; i++) {
//                 comp.push(
//                     <div key={i} className="form-group">
//                         <label>{this.props.properties[i]}</label>
//                         <input id={this.props.properties[i]} className="form-control" type="text" defaultValue="" />
//                     </div>);
//             }
//             return (comp)
//         } else {
//             return (<input type="text" defaultValue="1" />)
//         }
//     }
// }
// class Footer extends Component {
//     render() {
//         if (this.props.type === "button") {
//             return (
//                 <button className="btn" onClick={this.createBook}>Save</button>
//             )
//         } else {
//             return (<input type="text" defaultValue="1" />)
//         }
//     }
//     createBook() {
//         var title = $("#Title").val();
//         var editorial = $("#Editorial").val();
//         var isbn = $("#ISBN").val();
//         var edition = $("#Edition").val();
//         var clibrary = $("#CLibrary").val();
//         var language = $("#Language").val();
//         $.ajax({
//             type: 'POST',
//             url: `http://192.168.0.14:1212/service/createbook`,
//             data: {
//                 title: title,
//                 editorial: editorial,
//                 isbn: isbn,
//                 edition: edition,
//                 clibrary: clibrary,
//                 language: language
//             },
//             success: (res) => {
//                 swal({
//                     title: "Saved Book",
//                     text: "",
//                     icon: "success",
//                 });
//                 // this.setState({
//                 //     books: res,
//                 // });
//             },
//             error: function (xhr, status, err) { }
//         });
//     }
// }
export default Modal;
