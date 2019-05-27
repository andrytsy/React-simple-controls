import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class Pagination extends Component {
    static propTypes = {
        pages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        callback: PropTypes.func.isRequired
    }

    render() {
        const { pages } = this.props
        return (
            <ul className="pagination" onClick = { this.pageChangeHangler.bind(this) }>
                {
                    pages >= 2
                        ? this.getPaginationElements()
                        : null
                }
            </ul>
        )
    }

    getPaginationElements() {
        const { pages, currentPage } = this.props
        let elements = []

        for (let i = 1; i <= pages; i++) {
            let elem = <li key = {i} className = { 
                    i === currentPage 
                        ? 'pagination__item pagination__item_active' 
                        : 'pagination__item' 
                }>{ i }</li>
            elements.push(elem)
        }
        
        return elements
    }

    pageChangeHangler(event) {
        let selectedPage = Number(event.target.innerText)
        const { callback, currentPage } = this.props
        
        if (selectedPage && selectedPage !== currentPage)
            callback(selectedPage)
    }
}

export default Pagination