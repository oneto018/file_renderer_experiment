import React,{Component} from 'react';

const Folder="folder",File = 'file';



export default class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			x:1,
			fls:[1,2,3],
			mirrorContent:"x",
			nestedList:[],
			fileList:"n",
		};

	}
		
	componentDidMount() {
		setTimeout(()=>{
			console.log('setting state --------------------------------------------------->');
			this.setState({nestedList:['a']});
		},7000);	

	
	}

	change = (data) => {
		this.setState({mirrorContent:data});
		 console.log('changed-data',data);
	} 

	indexChange = (content)=>{
		this.setState({fileList:content});
	};

	render() {
		var {x,fls,mirrorContent,nestedList,fileList} = this.state;
		return (
			<Folder name="parent">
				<File name="child1">some text content</File>
				<File name="child2"></File>
				<Folder name="cp">
					<File name="cpc1">{x}</File>
					<File name="cpc2" onChange={this.change}>{mirrorContent}</File>
					<File name="mirrored">{mirrorContent}</File>
				</Folder>
				<Folder name="lst">
					{fls.map(x => <File name={x}>{x}</File>)}

				</Folder>
				<Folder name="lst2">

					{nestedList.map(x => (<Folder key={x} name={x}>
											<File name={x}>{x}</File>
										</Folder>))}
				</Folder>
				<Folder name="fileList">
					<File name="index" onChange={this.indexChange}>{fileList}</File>

					{fileList.split('\n').map(x => <File key={x} name={'l_'+x}>{x}</File>)}
				</Folder>
			</Folder>
			
		)
	}
}