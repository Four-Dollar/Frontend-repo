import React, { ChangeEvent, useState } from 'react';
import { useListingStore } from 'stores';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from 'assets/images/arrow-left.svg';
import { ReactComponent as RightArrow } from 'assets/images/arrow-right.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	height: 100%;
`;

const ImagePreviewContainer = styled.div`
	max-width: 100%;
	min-width: 100%;
	border-radius: 16px;
	background: #d9d9d9;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	overflow: auto;
	margin-bottom: auto;
`;

const ImagePreview = styled.img`
	border-radius: 16px;
`;

const ButtonPrev = styled.div`
	display: flex;
	background: #000000;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	margin-right: auto;
`;

const ButtonNext = styled.div`
	display: flex;
	background: #000000;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	margin-left: auto;
`;

const PagenationContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	max-width: 100%;
	min-width: 100%;
`;

const PagenationImageContainer = styled.div`
	display: flex;
	border-radius: 16px;
	align-items: center;
	background-color: #d9d9d9;
	width: 100px;
	height: 100px;
`;

const PagenationImage = styled.img`
	border-radius: 16px;
	width: 100px;
	height: 100px;
	object-fit: cover;
`;

const UploadContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const ImageGuide = styled.div`
	color: #a1a1a1;
	text-align: center;
`;

const ButtonContainer = styled.div``;

const ButtonLabel = styled.label`
	display: block;
	background-color: black;
	color: white;
	font-size: 22px;
	border-radius: 10px;
	font-weight: bold;
	box-shadow: 0px 2px 3px gray;
	text-align: center;
	padding: 16px;
	height: fit-content;
`;

const ButtonInput = styled.input``;

export function ImageInput() {
	const [imageSrc, setImageSrc] = useState('../assets/images/plus-icon');
	const [imageList, setImageList] = useState<string[]>([]);
	const [pageIndex, setPageIndex] = useState(0);
	const [pageNum, setPageNum] = useState(1);
	const MAX_PAGE = Math.ceil(imageList.length / 3);
	//imageView.length = 3;
	const [imageFileList, setImageFileList] = useListingStore((state) => [
		state.pictures,
		state.setPictures,
	]);

	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			// eslint-disable-next-line prefer-const
			for (let file of Array.from(event.target?.files)) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (event) => {
					const source = event.target?.result as string;
					//const finalResult = Removebg(source);
					setImageList((prev) => [...prev, source]);
					setImageFileList([...imageFileList, file]);
				};
			}
		}
	};

	const onClickPrev = () => {
		if (pageNum > 1) {
			setPageNum((prev) => {
				prev = prev - 1;
				setPageIndex((prev - 1) * 3);
				return prev;
			});
		}
	};
	const onClickNext = () => {
		if (pageNum < MAX_PAGE) {
			setPageNum((prev) => {
				prev = prev + 1;
				setPageIndex((prev - 1) * 3);
				return prev;
			});
		}
	};
	const onClickImage = (event: React.MouseEvent<HTMLImageElement>) => {
		setImageSrc((event.target as HTMLImageElement).src);
	};

	return (
		<Container>
			<ImagePreviewContainer>
				<ImagePreview src={imageSrc} />
			</ImagePreviewContainer>

			<PagenationContainer>
				<ButtonPrev onClick={onClickPrev}>
					<LeftArrow />
				</ButtonPrev>

				{imageList?.slice(pageIndex, pageIndex + 3).map((item) => (
					<PagenationImageContainer key={item}>
						<PagenationImage src={item} alt={item} onClick={onClickImage} />
					</PagenationImageContainer>
				))}

				<ButtonNext onClick={onClickNext}>
					<RightArrow />
				</ButtonNext>
			</PagenationContainer>

			<UploadContainer>
				<ImageGuide>
					단색 배경에 찍은 사진을 추가해주세요! <br />
					(다른 사용자들이 상품을 구분하기 쉽습니다.)
				</ImageGuide>
				<ButtonContainer>
					<ButtonLabel htmlFor="imgInput">업로드</ButtonLabel>
					<ButtonInput
						id="imgInput"
						type="file"
						accept="image/*"
						className="hidden"
						multiple
						onChange={changeHandler}
					/>
				</ButtonContainer>
			</UploadContainer>
		</Container>
	);
}
