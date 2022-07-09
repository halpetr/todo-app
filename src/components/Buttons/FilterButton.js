import React, { Component } from 'react';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineStop } from 'react-icons/ai';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export class FilterButton extends Component {
  render() {
    if (!this.props.useFiltered) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Filter by #</Tooltip>}
        >
          <Button
            style={{ marginTop: '8px', marginLeft: '10px' }}
            size="sm"
            id="filter-btn"
            onClick={() => this.props.setShowFilter()}
          >
            <BsFilter style={{ marginBottom: '3px' }} />
          </Button>
        </OverlayTrigger>
      );
    } else {
      return (
        <>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Filter by #</Tooltip>}
          >
            <Button
              style={{ marginTop: '8px', marginLeft: '10px' }}
              size="sm"
              id="filter-btn"
              onClick={() => this.props.setShowFilter()}
            >
              <BsFilter style={{ marginBottom: '3px' }} />
            </Button>
          </OverlayTrigger>
          <Button
            style={{ marginTop: '8px', marginLeft: '10px' }}
            size="sm"
            id="filter-btn"
            onClick={() => this.props.resetFilter()}
          >
            <AiOutlineStop style={{ marginBottom: '3px' }} />
          </Button>
        </>
      );
    }
  }
}

export default FilterButton;
