import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const tagContent =
    variant === "on-sale"
      ? "Sale"
      : variant === "new-release"
      ? "Just released!"
      : null;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {tagContent && <Tag variant={variant}>{tagContent}</Tag>}
        <Spacer size={12} />
        <Row isPriceRow>
          <Name>{name}</Name>
          {variant === "on-sale" ? (
            <SalePrice price={salePrice}>{formatPrice(salePrice)}</SalePrice>
          ) : (
            <Price>{formatPrice(price)}</Price>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1;

  ${"" /* Needed in order to position the tags on the corner */}
  position: relative;
  ${
    "" /* This isn't correct - they're supposed to grow and shrink as the window is resized, but if I don't set a max width, then it just fills up the whole column with one card. Setting flex-basis doesn't seem to do anything.*/
  }
  max-width: 340px;
  margin-bottom: 36px;

  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Tag = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: ${WEIGHTS.bold};
  line-height: 1.5;
  font-size: 14px;
  padding: 6px 8px;
  color: white;

  position: absolute;
  top: 10px;
  right: 0;

  background-color: ${({ variant }) =>
    variant === "new-release" ? COLORS.secondary : COLORS.primary};

  width: fit-content;
`;

const Row = styled.div`
  font-size: 1rem;

  ${"" /* If it's the name + price row on a ShoeCard, make it a flex row */}
  ${({ isPriceRow }) =>
    isPriceRow &&
    `
    display: flex;
    justify-content: space-between;
  `}
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
