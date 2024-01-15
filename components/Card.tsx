import React from "react";
import { CardProps } from "@/app/types";

export default function Card(props: CardProps) {
  return (
    <div className={`card card-flush ${props.myClass}`}>
      <div className="card-header d-flex justify-content-between">
        <h3 className="card-title align-items-start d-flex flex-column mb-0">
          <span className="card-label fw-bold text-gray-800">
            {props.title || "Title"}
          </span>
        </h3>
        {props.toolbar && (
          <div className="card-toolbar">{props.children[0]}</div>
        )}
      </div>
      <div className="card-body pt-0">
        {props.children[props.children.length - 1]}
      </div>
    </div>
  );
}
