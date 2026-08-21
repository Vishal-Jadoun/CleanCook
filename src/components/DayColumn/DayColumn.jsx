import './DayColumn.css';

function DayColumn({name,children}){
    return (
        <div className="day">
            <h2>{name}</h2>
           {children}
        </div>
    );
}

export default DayColumn;