'use client';

import {
	useState,
	useEffect,
	useRef,
	ChangeEvent,
	MutableRefObject,
	ReactNode,
} from 'react';
// import { useSession } from 'next-auth/react';
import axios from 'axios';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ClassFormProps {
	type: 'class' | 'lesson' | 'student';
	trigger: string | ReactNode;
	currentClass?: string;
	disabled?: boolean;
	deleting?: boolean;
	classId?: string;
}

const ClassForm = ({
	type,
	trigger,
	currentClass,
	deleting,
	disabled,
	classId,
}: ClassFormProps) => {
	// const { data: session } = useSession();
	// const user = session?.user;
	// const id = user?._id;
	// const token = user?.accessToken;

	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	const [className, setClassName] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		inputRef?.current?.focus();
		if (currentClass) {
			setClassName(currentClass);
			setIsEditing(true);
		} else {
			setClassName('');
			setIsEditing(false);
		}
	}, [currentClass]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setClassName(e.target.value);
	};

	const handleDelete = async () => {
		//
	};

	const handleSave = async () => {
		try {
			// if (!id) return;
			if (className === '') {
				setError('Please enter a name for the class.');
				return;
			}

			const method = isEditing ? 'put' : 'post';
			let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/`;
			if (isEditing) url += classId;

			await axios[method](
				url,
				{
					name: className,
				}
				// {
				// 	headers: { Authorization: token },
				// }
			);

			setError('');
			setClassName('');
		} catch (err: any) {
			console.log(err);
			if (err.response.data.error) {
				setError(err.response.data.error);
				return;
			}
		}
	};

	// if (deleting) {
	// 	return (
	// 		<DeleteForm
	// 			type='class'
	// 			open={open}
	// 			error={error}
	// 			handleDelete={handleDelete}
	// 			handleClose={handleClose}
	// 			setDeleted={setDeleted}
	// 		/>
	// 	);
	// }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='p-0 m-0 h-6 w-6'
					variant={'ghost'}
					disabled={disabled}>
					{trigger}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit' : 'Create new'} {type}
					</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<Input
						type='class'
						placeholder='Class name'
						required={true}
						onChange={e => setClassName(e.target.value)}
					/>
				</DialogDescription>
				<DialogFooter className='flex gap-5'>
					<Button variant='default' className='w-20'>
						Save
					</Button>
					<DialogClose asChild>
						<Button variant='outline' className='w-20'>
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		// 	<form className='px-12 pb-5 pt-10'>
		// 		<p className='absolute top-20 text-rose-800'>{error}</p>
		// 		<div className='grid grid-cols-[1fr_6fr] gap-x-3 gap-y-5'>
		// 			<label>Name:</label>
		// 			<input
		// 				ref={inputRef}
		// 				required
		// 				type='text'
		// 				name='name'
		// 				value={className}
		// 				onChange={handleInputChange}
		// 				className='flex-1 rounded-md bg-slate-200 px-2 py-1'
		// 			/>
		// 		</div>
		// 		<div className='mt-5 flex justify-end gap-5 border-t-[1px] border-t-slate-300'>
		// 			<button
		// 				type='button'
		// 				className='btn-cancel mt-5'
		// 				onClick={() => {}}>
		// 				Cancel
		// 			</button>
		// 			<button
		// 				className='btn-primary mt-5'
		// 				onClick={e => {
		// 					e.preventDefault();
		// 					handleSave();
		// 				}}>
		// 				Save
		// 			</button>
		// 		</div>
		// 	</form>
		// </div>
	);
};

export default ClassForm;
