import ReactReconciler from 'react-reconciler';
import {diff} from 'deep-diff';
import createElement from './createElement';
import util from 'util';
import fs from 'fs';
import rimraf from 'rimraf';
import appendChild from './appendChild';

const rootHostContext = {};

const hostConfig = {
	now: Date.now,
	getRootHostContext: () => {
		return rootHostContext;
	},
	prepareForCommit: () => {},
	resetAfterCommit: () => {},
	getChildHostContext: () => {},
	shouldSetTextContent: (type, props) => {
		 return typeof props.children === 'string' || typeof props.children === 'number';;
	},
	createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
		return createElement(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);
	},
	createTextInstance: (text ) => {
		return text;
	},
	appendInitialChild:appendChild("initial"),

	finalizeInitialChildren: (element, type, props) => {
		console.log('finalize inital children',{element,type,props});
	},
	supportsMutation: true,
	appendChildToContainer :(parent, child) =>{
		console.log('appendChildToContainer',{parent,child});
	},
	prepareUpdate(element, type, oldProps,newProps){
		var args = [arguments[0],arguments[1],arguments[2],arguments[3]]

		var oldPropsCloned = {...oldProps};
		var newPropsCloned = {...newProps};
		if(type !=='file'){
			delete oldPropsCloned.children;
			delete newPropsCloned.children;
		}
	   	var df =  diff(oldPropsCloned,newPropsCloned);
	   	if(df){
	   		console.log('prepareUpdate',{element,type,newProps,df});
	   	}
	   return df;

	},
	commitUpdate(element, updatePayload, type, oldProps, newProps) {
		var {children,...restOldProps} = oldProps;
		var {children,...restNewProps} = newProps;
		var diffObj = diff(restOldProps,restNewProps);
		var name = element.props.name;
		var type = element.type;
		if(type=='file'){
			fs.writeFileSync(element.realPath,newProps.children||"");
		}
		//console.log('commit update arguments',arguments);
		console.log('commitUpdate',util.inspect({name,type,updatePayload,type,diffObj},{depth:null,colors:true}));
	},
  commitTextUpdate(textInstance, oldText, newText) {
    console.log('commitTextUpdate',{textInstance,oldText,newText});
  },
  removeChild(parentInstance, child) {
  	console.log('removeChild',{parentInstance,child});
  	if((parentInstance.type=='folder') && (child.type=='file')){
		var filePath = `./wd/${parentInstance.path}/${child.props.name}`;
		fs.unlinkSync(filePath);
  	} else if ((parentInstance.type=='folder') && (child.type=='folder')){
		rimraf.sync(`./wd/${child.path}`);
  	}
    //parentInstance.removeChild(child);
  },

  appendChild: appendChild(""),
};
const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
	render: (reactElement, element, callback) => {
		if (!element._rootContainer) {
	      element._rootContainer = ReactReconcilerInst.createContainer(element, false);
	    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, element._rootContainer, null, callback);
	}
}