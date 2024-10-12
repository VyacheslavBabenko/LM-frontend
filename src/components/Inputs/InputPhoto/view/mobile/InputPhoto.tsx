/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import block from "bem-cn";

import Button from "components/Button/desktop";
import SVG from "components/SVG";

import { useAppSelector } from "shared/hooks";

import crossSVG from "../../img/cross.svg";
import useImageInput from "../../model/useImageInput";
import { IInputPhotoProps } from "./types";

import "./InputPhoto.scss";

const b = block("input-photo-mobile");

const InputPhoto = ({
	currentImageData,
	name,
	onImageChange,
	url,
	...restProps
}: IInputPhotoProps) => {
	const locale = useAppSelector((state) => state.locale.common, shallowEqual);
	const ref = useRef<HTMLInputElement>(null);

	const withImage = Boolean(currentImageData.image);

	const handleImgChange = useImageInput();

	useEffect(() => {
		const handleUrlLoad = async () => {
			if (url) {
				try {
					const response = await fetch(url);

					if (!response.ok) {
						throw new Error("Ошибка сети");
					}

					const data = await response.blob();

					let mimeType = data.type;
					if (mimeType === "application/gzip" && url.endsWith(".webp")) {
						mimeType = "image/webp";
					}

					const file = new File([data], "img", { type: mimeType });
					const imageData = await handleImgChange(file);

					if (onImageChange) onImageChange(imageData);
				} catch (error) {
					console.error("Ошибка загрузки изображения:", error);
				}
			}
		};

		handleUrlLoad();
	}, [url]);

	const handleDragPrevent = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleClickPrevent = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleImageDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const imageData = await handleImgChange(e.dataTransfer.files);
		if (onImageChange) onImageChange(imageData);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageData = await handleImgChange(e.currentTarget.files);
		if (onImageChange) onImageChange(imageData);
	};

	const handleImageDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (ref.current) ref.current.value = "";

		onImageChange({
			ext: "",
			image: null,
			error: null,
		});
	};

	return (
		<label
			className={b({ withImage })}
			onDragEnter={handleDragPrevent}
			onDragOver={handleDragPrevent}
			onDrop={handleImageDrop}
		>
			<input
				className={b("native")}
				type="file"
				name={name}
				accept=".jpeg,.png,.jpg,.gif,.webp"
				onChange={handleFileChange}
				ref={ref}
				{...restProps}
			/>
			{currentImageData.image && (
				<>
					<img
						className={b("img")}
						src={currentImageData.image.toString()}
						alt="img"
						onClick={handleClickPrevent}
					/>
					<div className={b("buttons")}>
						<div className={b("button")}>
							<Button color="hollow-red" onClick={handleImageDelete}>
								{locale.delete}
							</Button>
						</div>
						<div className={b("space")} onClick={handleClickPrevent} />
						<div className={b("button")}>
							<Button color="hollow-blue" onClick={() => ref.current?.click()}>
								{locale.loadOther}
							</Button>
						</div>
					</div>
				</>
			)}
			{!withImage && (
				<>
					<SVG className={b("cross")} svgProps={{ src: crossSVG }} />
					{locale.chooseFile}
				</>
			)}
		</label>
	);
};

export default InputPhoto;
