import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import TopSidebar from '../../components/sidebar/top-sidebar';

import './Theme.scss';

class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aritcle: []
        };
    }

    render() {
        return (
            <div className="sidebar-container">
                <TopSidebar />
                <div className="main-container">
                    <UserMenu />
                    <article id ="main" className="ly_cont">
                        <div className="bl_media bl_media__rev">
                            <figure className="bl_media_image-wrapper bl_media_image-wrapper__borderd">
                                <img src="https://placehold.jp/300x300.png" alt="写真：手に持たれたスマホ" />
                            </figure>
                            <div class="bl_media_body">
                                <h2 className="bl_media_title">
                                    ユーザーを考えた設計で満足な体験を
                                </h2>
                                <p>
                                    提要するサービス等によって異なります。体験を提供するためには、ユーザーのニーズを理解し、それに合わせた設計を行うことが重要です。ユーザーのニーズを理解するためには、ユーザーの行動や考え方を知ることが必要です。ユーザーの行動や考え方を知るためには、ユーザーの声を聞くことが重要です。ユーザーの声を聞くことで、ユーザーのニーズを理解し、それに合わせた設計を行うことができます。ユーザーのニーズを理解し、それに合わせた設計を行うことで、ユーザーは満足な体験を得ることができます。
                                </p>
                                <h3 className="sub-title">
                                    ペルソナとは？
                                </h3>
                                <span>
                                    自社商品やサービスを利用するユーザーを具体的にイメージしたものを指します。ペルソナを設定することで、ユーザーの行動や考え方を理解し、それに合わせた設計を行うことができます。
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default Theme;