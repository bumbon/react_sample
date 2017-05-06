var Comment = React.createClass({
            getInitialState: function (){
                return {editing: false}
            },
            edit: function () {
                console.log('Editing comment');
        		this.setState({editing: true}); 
        	},
        	
        	remove: function () {
        		console.log('Removing comment');
        		this.props.deleteFromBoard(this.props.index)
        	},
        	save: function () {
        	    this.props.updateCommentText(this.refs.newText.value, this.props.index);
                console.log('New comment');
        		this.setState({editing: false}); 
        	},
        	
        	renderNormal: function(){
        	    return (
        	        <div className="commentContainer">
        	            <div className="commentText">{this.props.children}</div>
        	            <button onClick={this.edit} className="button-primary">Edit</button>
                        <button onClick={this.remove} className="button-danger">Remove</button>
        	        </div>
        	     );
        	},
        	
        	renderForm: function(){
        	    return (
        	        <div className="commentContainer">
        	            <textarea ref="newText" defaultValue={this.props.children}></textarea>
        	            <button onClick={this.save} className="button-success">Save</button>
        	        </div>
        	     );
        	},
        	render: function () {
        	    if(this.state.editing){
        	        return this.renderForm();
        	    } else {
        	        return this.renderNormal();
        	    }
        	}
        });    	
        var Board = React.createClass({
            getInitialState: function () {
                return {
                    comments: [
                            'I like smth',
        					'Want to get smth',
        					'Ok, that\'s enough comments now' 
                        ]
                }
            },
            add: function (text) {
        		var arr = this.state.comments;
        		arr.push(text);
        		this.setState({comments: arr})
    	    },
            removeComment: function (i) {
                console.log('Removing comment: ' + i);
                var arr = this.state.comments;
                arr.splice(i, 1);
                this.setState({comments: arr})
            },
            
            updateComment: function (newText, i) {
                console.log('Updating comment: ' + i);
                var arr = this.state.comments;
                arr[i] = newText;
                this.setState({comments: arr})
            }, 
            
            eachComment: function(text, i){
    		 	return (
        				 <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
        				        {text}
        				 </Comment>
        		        );
    		},
            render: function () {
                return (
                    <div>
                        <h3> Sample for DeployCode ...</h3>
                        <button onClick={this.add.bind(null, 'Default text')} className="button-info create">Add New</button>
                        <div className="board">
                             {this.state.comments.map(this.eachComment)}
                         </div>
                    </div>    
                    );
            }
        });
        ReactDOM.render(<Board />, document.getElementById('container'));