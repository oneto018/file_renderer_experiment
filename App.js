import React,{Component} from 'React';

const Folder="folder",File = 'file';



export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {x:1,fls:[1,2,3],mirrorContent:""};

	}
		
	componentDidMount() {
		setTimeout(()=>{
			console.log('setting state');
			this.setState({x:this.state.x+1,fls:[1,3]});
		},7000);	
	}

	change = (data) => {
		this.setState({mirrorContent:data});
		 console.log('changed-data',data);
	} 

	render() {
		var {x,fls,mirrorContent} = this.state;
		return (
			<Folder name="parent">
				<File name="child1">some text content</File>
				<File name="child2"></File>
				<Folder name="cp">

					<File name="cpc1">{x}</File>
					<File name="cpc2" onChange={this.change}></File>
					<File name="mirrored">{mirrorContent}</File>
				</Folder>
				<Folder name="lst">
					{fls.map(x => <File key={x} name={x}>{x}</File>)}

				</Folder>
			</Folder>
			
		)
	}
}