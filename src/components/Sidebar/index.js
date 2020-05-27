import React from 'react';

import {
    Segment,
    Sidebar,
    Menu,
    Icon
} from 'semantic-ui-react';

import {
    Link 
} from 'react-router-dom';

class SidebarComponent extends React.Component {

    close = () => {
        if(this.props.onClose) this.props.onClose();
    }
    render() {
        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    direction='left'
                    inverted
                    vertical
                    visible={this.props.visible}
                >
                    <Menu.Item as={Link} to='/rounding' onClick={this.close} header>Rounding</Menu.Item>
                    <Menu.Item as={Link} to='/basictens' onClick={this.close} header>Basic 10s</Menu.Item>
                    <Menu.Item as={Link} to='/missingnumber' onClick={this.close} header>Missing Number</Menu.Item>
                    <Menu.Item as='a' header onClick={this.close} >Close Menu</Menu.Item>
                    <Menu.Item>release: {this.props.release.commit}</Menu.Item>
                    <Menu.Item>date: {this.props.release.date}</Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SidebarComponent;
