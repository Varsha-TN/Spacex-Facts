
import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class About extends React.Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div class="valign-wrapper" >
                <div class="valign" >
                    <div class="container">
                        <div class="row">
                            <div class="col s6 m12 offset-m6">
                                <div class="card medium white center">
                                    <div class="card-content black-text">
                                        <span class="card-title center">  About </span><br />
                                        <p>The API used to gather information on this website is made by Jake Meyer, and can be found&nbsp;
                                <a href="https://github.com/r-spacex/SpaceX-API" class="pink-text"> here. </a></p>
                                        <br />
                                        <p>I have used the awesome <a href="https://materializecss.com/" class="pink-text">Materialize</a></p><br />
                                        <p> All assets are accessed from and the property of SpaceX </p>
                                Find me on <i class="fa fa-github" /> <a href="https://github.com/Varsha-TN" class="pink-text"> MY GITHUB </a> <br />
                                        <p>If you have any query, contact me by dropping words @ <a href="mailto:varshatn45cs@gmail.com" class="pink-text">My Email<i class="fa fa-envelope-square" /> </a></p><br />
                                        <span class="left">Cheers! <i class="fa  fa-thumbs-up"></i></span><br />
                                        <span class="center ">Built with <i class="fa fa-heart " ></i> Smelted with <a href="https://reactjs.org/" class="pink-text">React</a> </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}




const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps, null)(About)