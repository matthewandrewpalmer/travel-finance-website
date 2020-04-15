import React from "react";
import RailJourneyListItem from "../RailJourneyListItem";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";

describe("RailJourneyListItem", () => {

    const testProps = {
        journey: {
            id: 0,
            journey_type: "Single",
            departing: "departing",
            destination: {String: "destination ", Valid: true},
            ticket_name: {String: "", Valid: false},
            date: "2020-04-15T00:00:00Z",
            railcard_used: true,
            cost: 100,
            total_cost: 10,
        },
        index: 0
    };

    it("renders correctly", () => {
        const tree = renderer.create(
            <RailJourneyListItem
                {...testProps}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test.skip("renders departing and destination", () => {
        const {getByText} = render(
            <RailJourneyListItem
                {...testProps}
            />
        );
        let string = testProps.journey.departing + "\n - \n" + testProps.journey.destination;
        const linkElement = getByText(string);
        expect(linkElement).toBeInTheDocument();
    });
});