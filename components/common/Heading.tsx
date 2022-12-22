type headingTypes = "h1"|"h2"|"h3"|"h4"|"h5"|"h6";

interface Props {
    as: headingTypes;
    children: React.ReactNode;
}

const Heading = ({ as, children }: Props): JSX.Element => {

    switch(as) {
        case "h1": 
            return <h1 className="font-bold text-white text-3xl mb-4">{children}</h1>
        case "h2": 
            return <h2 className="font-bold text-white text-2xl">{children}</h2>
        case "h3": 
            return <h3 className="font-bold text-white text-xl">{children}</h3>
        case "h4": 
            return <h4 className="font-bold text-white text-lg">{children}</h4>
        case "h5": 
            return <h5 className="font-bold text-white">{children}</h5>
        case "h6": 
            return <h6 className="font-bold text-white">{children}</h6>
        default:
            return <>{children}</>;
    }
};

export default Heading;