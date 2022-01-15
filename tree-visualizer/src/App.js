import './App.css';
import {
	BinaryTreeNode,
	drawBinaryTree,
	setTheme,
	VisualizationType,
} from 'binary-tree-visualizer/lib';
import { useState } from 'react';

function App() {
	const [arr, setArr] = useState('');
	const input = document.querySelector('input');

	const getInput = (e) => {
		setArr(e.target.value);
	};
	let root = -1;

	const drawTree = () => {
		function insert(node, value) {
			if (node === -1) {
				root = new BinaryTreeNode(value);
				return;
			}

			if (node.value === value) {
				return;
			}

			if (value < node.value) {
				if (node.left) {
					insert(node.left, value);
					return;
				}
				node.setLeft(new BinaryTreeNode(value));
				return;
			}

			if (node.right) {
				insert(node.right, value);
				return;
			}

			node.setRight(new BinaryTreeNode(value));
		}

		let nums = arr.slice(1, arr.length - 1); //REMOVE BRACKETS [ , ]

		//SPLIT

		//returns a new array
		//method doesn't change the original string
		let arr1 = nums.split(',');

		let result = arr1.map((num) => {
			return parseInt(num);
		});

		console.log(result);

		let dontdraw = false;
		result.forEach((num) => {
			if (isNaN(num)) {
				dontdraw = true;
				return;
			}
		});

		// const nodes = [50, 100, 20, 40, 70, 60, 80];

		if (dontdraw) {
			alert('WRONG INPUT');
			setArr('');
			return;
		}
		result.forEach((num) => {
			insert(root, num);
		});
		drawBinaryTree(root, document.querySelector('canvas'), {
			type: VisualizationType.PRETTY,
		});

		setArr('');
		root = -1;
		input.value = '';
	};

	return (
		<div>
			<main>
				<canvas></canvas>
				<br />
				<input type="text" onChange={getInput} id="box" />
				<br />
				<button onClick={drawTree} id="btn">
					DRAW
				</button>
			</main>
		</div>
	);
}
setTheme({
	fontSize: 15,
	radius: 40,
	leafNodeSpace: 90,
});

export default App;
