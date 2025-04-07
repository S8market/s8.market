//not in use (idea drop)

import "./topAuctioners.scss";

const auctionersData = [
  {
    name: "State Bank of India",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/141de50f5550530c81aa264c51d67edd52a939cd6a0b2f66042d0f3a22ae5b97?placeholderIfAbsent=true&apiKey=e80f20ecf30841dba73cb2738bb00e1e",
  },
  {
    name: "Punjab National Bank",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a522080ba59ceeda7978e90d418394378ab5f52e9fe6d921aaa91d921cfb0a6?placeholderIfAbsent=true&apiKey=e80f20ecf30841dba73cb2738bb00e1e",
  },
  {
    name: "Kotak Mahindra Bank",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/4cc96de219dd625da3f96d7cf294f64d9531dca79fb7c7a73e2fb4f8a148e7fb?placeholderIfAbsent=true&apiKey=e80f20ecf30841dba73cb2738bb00e1e",
  },
  {
    name: "MHB",
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc08c28f5c847923894cf5f28383c470432e461a5b68c1e2541e7220f1159c02?placeholderIfAbsent=true&apiKey=e80f20ecf30841dba73cb2738bb00e1e",
  },
];

function TopAuctioners() {
  return (
    <div className="topAuctionersContainer">
      <div className="topAuctionersHeader">
        <div className="topAuctionersTitle">Top Auctioners</div>
        <div className="seeMoreLink">See more</div>
      </div>
      <div className="auctionerList">
        {auctionersData.map((auctioner, index) => (
          <div key={index} className="auctionerItem">
            <img
              loading="lazy"
              src={auctioner.avatar}
              className="auctionerAvatar"
              alt={auctioner.name}
            />
            <div className="auctionerName">{auctioner.name}</div>
            <button className="viewAuctionButton">View Auction</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopAuctioners;




// import React from 'react';
// import styles from '../styles/Dashboard.module.css';

// export const AuctionerCard = ({ logo, name }) => {
//   return (
//     <div className={styles.auctionerCard}>
//       <img loading="lazy" src={logo} alt={`${name} logo`} className={styles.auctionerLogo} />
//       <div className={styles.auctionerName}>{name}</div>
//       <button className={styles.auctionButton}>View Auctions</button>
//     </div>
//   );
// };