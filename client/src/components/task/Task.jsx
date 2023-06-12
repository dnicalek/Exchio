/* eslint-disable react/prop-types */

export default function Task({taskName, deadline, notes, priority, status}) {

  return (
    <div style={foldStyles}>
      <h3>{taskName}</h3>
      <p>{deadline}</p>
      <p>{notes}</p>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
      {/* <div style={foldAfterStyles}></div> */}
    </div>
  );
}


// const foldStyles = {
//     position: 'relative',
//     left: '50%',
//     top: '55%',
//     transform: 'translate(-50%, -50%)',
//     minWidth: '400px',
//     minHeight: '200px',
//     backgroundColor: '#729A85',
//     borderRadius: 10,
//     padding: 20,
//     margin: 20,
// };
//   const foldAfterStyles = {
//     position: 'absolute',
//     content: '',
//     right: '0',
//     top: '0',
//     borderBottom: '50px solid #577E6B',
//     borderRight: '50px solid #000',
//     borderBottomLeftRadius: 10,
//   };

const foldStyles = {
    minWidth: '400px',
    minHeight: '200px',
    backgroundColor: '#729A85',
    borderRadius: 10,
    padding: 20,
    margin: 20,
};

