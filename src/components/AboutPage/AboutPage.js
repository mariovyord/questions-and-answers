import { useEffect, useState } from 'react'
import { BsGithub } from 'react-icons/bs';
import MDEditor from '@uiw/react-md-editor';

export default function AboutPage() {
	const [content, setContent] = useState('');

	useEffect(() => {
		const termsFrPath = require('./README.md');
		fetch(termsFrPath)
			.then(response => {
				return response.text()
			})
			.then(text => {
				setContent(text);
			})
	})

	useEffect(() => {
		document.title = "About"
	}, []);

	return (
		<div className='grid grid-cols-5 max-w-6xl py-3'>
			<div className='col-start-2 col-end-5 custom-list-decoration'>
				<MDEditor.Markdown
					source={content}
					style={{
						backgroundColor: 'hsl(var(--b2))',
						color: 'hsl(var(--bc))',
					}}
				/>
			</div>
		</div>
	)
}
