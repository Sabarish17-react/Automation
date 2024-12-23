// import React from "react";
// import styled from "@emotion/styled";
// import { Tree, TreeNode } from "react-organizational-chart";


// const StyledNode = styled.div`
//   padding: 5px;
//   width: 50px;
//   height: 50px;
//   border-radius: 100%;
//   display: inline-block;
//   position: absolute;
//   border: 2px solid #f3f3f3;
//   top: -30px;
//   left: 40px;
//   z-index: 2;
//   background: #ffc0cb;

// `;

// const StyledCard = styled.div`
 
//   padding: 8px;
//   display: flex;
//   flex-direction: column;
//   width: 130px;
//   height: 80px;
//   display: inline-block;
//   border: 1px solid red;
//   position: relative;
//   background: #fafafa;
//   box-shadow: -2px 2px 10px 3px rgba(0, 0, 0, 0.1);
  
  
// `;

// const TitleCard = styled.div`
//   position: relative;
//   top: 20px;
// `;


// const card = (props) => (

//   <StyledCard>
//     <StyledNode>
//       <img alt="img" src="" />
//     </StyledNode>
//     <TitleCard>
//       <b>{props.name}</b>
//     </TitleCard>
//     <TitleCard>
//       <span style={{ fontSize: 12 }}>{props.email}</span>
//     </TitleCard>

//   </StyledCard>

// );

// const StyledTreeExample = () => (
//   <div
//     style={{
//       width: "100%",
//       height: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       position: "relative",
//       top: "100px"
//     }}
//   >
//     <Tree
//       lineWidth={"3px"}
//       lineColor={"green"}
//       lineHeight={"60px"}
//       lineBorderRadius={"0px"}
//       nodePadding={"10px"}
//       label={card({ name: "ArunPrakash s.p" })}
//     >
//       <TreeNode label={card({ name: "Gowthaman.A", })}>
//         <TreeNode
//           label={card({
//             name: "velu R",

//           })}
//         >

//           <TreeNode
//             label={card({
//               name: "Akshay kumar",

//             })}>
//           </TreeNode>
//         </TreeNode>
//         <TreeNode
//           label={card({
//             name: "vigneshwar A",

//           })}

//         >
//           <TreeNode
//             label={card({
//               name: "Sabarisan",

//             })}>
//           </TreeNode>
//         </TreeNode>
//         <TreeNode
//           label={card({
//             name: "shaniya s",

//           })}
//         >
//           <TreeNode
//             label={card({
//               name: "Chithira suresh",

//             })}>
//           </TreeNode>
//           <TreeNode
//             label={card({
//               name: "kiran",

//             })}>
//           </TreeNode>
//         </TreeNode>

//         <TreeNode
//           label={card({
//             name: "Mohanraj",

//           })}
//         >
//           <TreeNode
//             label={card({
//               name: "Prakash",

//             })}>
//           </TreeNode>
//           <TreeNode
//             label={card({
//               name: "Arunodhayan",

//             })}></TreeNode>
//         </TreeNode>

//         <TreeNode
//           label={card({
//             name: "Logu",

//           })}
//         >
//           <TreeNode
//             label={card({
//               name: "naveen",

//             })}>
//           </TreeNode>
//           <TreeNode
//             label={card({
//               name: "Malan",

//             })}>
//           </TreeNode>

//           <TreeNode
//             label={card({
//               name: "Hari",

//             })}>
//           </TreeNode>
//           <TreeNode
//             label={card({
//               name: "nithish",

//             })}>
//           </TreeNode>


//         </TreeNode>
//       </TreeNode>
//     </Tree>
//   </div>
// );

// export default StyledTreeExample;


import React from "react";

function ElectronicsHelp(props) {
    return(
        <div style={{marginTop: "10rem"}}>
            organisationScreen
        </div>
    )
}

export default ElectronicsHelp;